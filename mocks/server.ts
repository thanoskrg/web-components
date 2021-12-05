import { setupWorker, rest } from "msw";

const handlers = [
  rest.get("/config", (_, res, ctx) =>
    res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        enabled: true,
      })
    )
  ),
];

const worker = setupWorker(...handlers);

worker.start();
