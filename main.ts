// First-Minute Flip — a pump.fun replay bot for agent-fun/replay/v2.
// The grader runs `node /bot/main.ts`; the strategy lives in strategy.ts and the
// protocol shim is the kit's sdk/ts/makefun-bot.ts, vendored byte for byte.
//
// The bot answers the harness's hello, then one reply per batch of chain events:
// buys on the first-minute breakout signal, sells on take-profit / stop / trailing
// stop / creator sell / flow reversal / time limit, and tiny probe round trips to
// stay above the 20-coin guardrail. See strategy.ts for the full reasoning.

import { runBot } from './vendor/makefun-bot.ts';
import { createBot, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createBot(DEFAULT_PARAMS));
