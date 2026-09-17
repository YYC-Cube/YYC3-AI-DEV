#!/usr/bin/env python3
"""
============================================================
YYC³ AI Family — 人从众曌众从人
@Module : tests/load/bench — CI 压测编排
@Family-Owner : 🤔 语枢·万物
============================================================
参考 llama.cpp bench.py 设计：
  起服务 → 跑 k6 → 从 Prometheus 抽指标 → 生成图表
============================================================
"""
import os
import sys
import json
import subprocess
import time
import requests
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

BASE_URL = os.environ.get("API_BASE", "https://api.0379.world")
SCENARIO = os.environ.get("SCENARIO", "smoke")
K6_BIN = os.environ.get("K6", "./k6-sse")
RESULTS_DIR = "tests/load/results"


def run_k6(scenario: str) -> dict:
    """运行 k6 场景并返回指标"""
    os.makedirs(RESULTS_DIR, exist_ok=True)
    summary_file = f"{RESULTS_DIR}/{scenario}-summary.json"

    print(f"🌹 运行 k6 场景: {scenario}")
    result = subprocess.run(
        [
            K6_BIN,
            "run",
            "--summary-export", summary_file,
            f"tests/load/k6/scenarios/{scenario}.js",
        ],
        env={**os.environ, "API_BASE": BASE_URL},
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print(f"⚠️ k6 退出码: {result.returncode}")
        print(result.stderr)

    if os.path.exists(summary_file):
        with open(summary_file) as f:
            return json.load(f)
    return {}


def fetch_prometheus_metrics() -> dict:
    """从 Prometheus 拉取服务端指标"""
    try:
        r = requests.get(f"{BASE_URL}/metrics", timeout=10)
        if r.status_code != 200:
            return {}
        # 解析 Prometheus 文本格式
        metrics = {}
        for line in r.text.split("\n"):
            if line.startswith("#") or not line.strip():
                continue
            parts = line.rsplit(" ", 1)
            if len(parts) == 2:
                metrics[parts[0]] = float(parts[1])
        return metrics
    except Exception as e:
        print(f"⚠️ Prometheus 不可达: {e}")
        return {}


def generate_charts(summary: dict, prom: dict):
    """生成 TTFT / TPS 图表"""
    os.makedirs(RESULTS_DIR, exist_ok=True)

    metrics = summary.get("metrics", {})

    # TTFT 图
    fig, axes = plt.subplots(1, 3, figsize=(18, 5))

    # 1. TTFT 分布
    ttft = metrics.get("sse_ttft_ms", {})
    if ttft:
        labels = ["avg", "p(50)", "p(95)", "p(99)"]
        keys = ["avg", "med", "p(95)", "p(99)"]
        values = [ttft.get(k, 0) for k in keys]
        axes[0].bar(labels, values, color="#6C5CE7")
        axes[0].set_title("SSE TTFT (ms)", fontweight="bold")
        axes[0].set_ylabel("ms")

    # 2. TPS
    tps = metrics.get("sse_tps", {})
    if tps:
        labels = ["avg", "p(50)", "p(95)"]
        keys = ["avg", "med", "p(95)"]
        values = [tps.get(k, 0) for k in keys]
        axes[1].bar(labels, values, color="#22C55E")
        axes[1].set_title("Tokens per Second", fontweight="bold")

    # 3. 错误率
    err = metrics.get("sse_stream_errors", {})
    if err:
        rate = err.get("rate", 0) * 100
        axes[2].pie(
            [rate, 100 - rate],
            labels=[f"错误 {rate:.2f}%", "成功"],
            colors=["#EF4444", "#22C55E"],
        )
        axes[2].set_title("错误率", fontweight="bold")

    plt.suptitle("🌹 YYC³ AI Family · SSE 压测报告", fontsize=16, fontweight="bold")
    plt.tight_layout()
    chart_path = f"{RESULTS_DIR}/ttft-chart.png"
    plt.savefig(chart_path, dpi=150)
    print(f"📊 图表: {chart_path}")


def main():
    print("🌹 YYC³ AI Family · SSE 压测编排")
    print("   人从众曌众从人 · 语枢一启，万物皆明\n")

    # 1. 预检
    try:
        r = requests.get(f"{BASE_URL}/healthz", timeout=5)
        print(f"✅ 服务可达: {r.status_code}")
    except Exception as e:
        print(f"🚫 服务不可达: {e}")
        sys.exit(1)

    # 2. 跑 k6
    summary = run_k6(SCENARIO)

    # 3. 拉 Prometheus 指标
    prom = fetch_prometheus_metrics()

    # 4. 生成图表
    if summary:
        generate_charts(summary, prom)

    # 5. 写报告
    report = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "scenario": SCENARIO,
        "base_url": BASE_URL,
        "summary": summary,
        "prometheus": prom,
    }
    with open(f"{RESULTS_DIR}/report.json", "w") as f:
        json.dump(report, f, indent=2)

    print(f"\n✅ 压测完成，报告: {RESULTS_DIR}/report.json")


if __name__ == "__main__":
    main()
