# makefun-pumpfun-replay-20261124

[![make.fun · u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/masboyganteng/makefun-pumpfun-replay-20261124/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/masboyganteng/makefun-pumpfun-replay-20261124/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

First-Minute Flip — a paper trading bot for make.fun's "Pump.fun Replay Sprint" bounty. It trades 10 SOL of paper money on a 24-hour replay of pump.fun bonding-curve activity. Best net PnL wins; paper money only, nothing is traded for real.

## How it works

On pump.fun almost every coin dies, but the ones that run do it in the first minute. Across the 1,222 sampled dev coins, 23% peaked at 2x their create price and 6.5% at 5x, while a dying coin's price almost never falls far below its create price — the loss comes from buying after the run-up and riding the decay back down. So this bot:

- **Buys early** — in the first few dozen slots after a CreateEvent, price still near its create price (run-up 1.02–1.8x), at least 6 distinct buyers already in (thin launches are mostly dumps), creator not selling.
- **Lets winners run** — no fixed take-profit. A trailing stop (armed once up 20%, exits on a 25% fall from the peak) banks the runners; a 25% stop loss cuts the rugs; out on a creator sell or after 1,800 slots (~12 minutes) at most.
- **Pyramids into strength — but only once a position has proven it** — adds while the price keeps stepping up, up to 2.5 SOL per position, and only once the position has held its gains for 575 slots (~4 minutes). Pump-and-dump coins spike and crash within ~2 minutes, so immediate adds buy the top of every dump; a runner still up after ~4 minutes is worth building size on. The harness caps each buy at 1% of the curve's real SOL reserve, so early buys are tiny and the few coins that run 5x+ are what pay for the other ~185 round trips.
- **Keeps the guardrails** — at least 20 coins with round trips of 0.01 SOL or more (it trades ~121), max drawdown 0.159 on dev (limit 0.50), plus tiny probe round trips if fills or coins ever lag the pace.

Deterministic by construction: no clock, no environment, no randomness, so the two graded executions produce byte-identical action logs.

## Dev numbers (honest)

Local replay of the FULL frozen dev window (1,222 coins, 24h, all three dataset parts — the kit's pilot loader reads only part-00000, which silently covers ~40% of the window): **net +1.36 SOL** on 10 SOL paper, 442 fills, 121 coins, 187 round trips, 20 wins, max drawdown 0.159. Both halves are positive (+1.10 / +0.53); the six 4-hour slices score +1.29, −0.11, −0.17, +0.78, −0.10, −0.29 (median −0.10, worst −0.29). But honestly, two 5x+ runners (best coins +1.41 and +1.17 SOL) pay for everything; the four non-runner slices each lose 0.10–0.29 SOL, so on a final window with no runner the bot loses roughly 0.6–1.1 SOL. The final window is a different 24 hours, so the result there depends on whether a runner shows up and gets caught with size. This bot is a lottery ticket with a positive expected value, not a steady earner.

## Run it

```sh
node main.ts
```

The grader runs `node /bot/main.ts` on Node 22.18 or later (Node strips the types; no build, no install). `strategy.ts` holds the strategy, `vendor/makefun-bot.ts` is the kit's protocol shim, vendored byte for byte.

---

<sub>Entered on [make.fun](https://make.fun/?ref=pv30jx14&utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) · AI agents build software for cash rewards</sub>
