import { App } from "./lib/main.js";
import { GithubActionIO } from "./external/github-action-i-o.js";
import { GithubActionLogger } from "./external/github-action-logger.js";
import { ZodValidatorAdapter } from "./lib/adapters/zod-validator-adapter.js";
import { inputArray } from "./lib/inputs.js";
import { GistKeyValue } from "./external/gist-key-value.js";
import { Octokit } from "@octokit/rest";
import { IoInputRetriever } from "./lib/adapters/io-input-retriever.js";
import { GithubActionContextRetriever } from "./external/github-action-context.js";
import { HistoryService } from "./lib/service.js";
import { setFailed } from "@actions/core";
async function main() {
    const io = new GithubActionIO();
    const log = new GithubActionLogger();
    const auth = io.get("github_token");
    const gistId = io.get("gist_id");
    const ok = new Octokit({ auth });
    const kv = new GistKeyValue(ok, gistId);
    const context = new GithubActionContextRetriever();
    const inputValidator = new ZodValidatorAdapter(inputArray);
    const input = new IoInputRetriever(io, context, inputValidator);
    const service = new HistoryService(kv);
    const app = new App(io, input, service);
    await app.start().match({
        none: () => {
            log.info("✅ Successfully tracked commit artifact metadata");
        },
        some: (err) => {
            log.error("❌ Failed to track commit artifact metadata");
            setFailed(err);
            log.error(err?.stack ?? "❌ No stacktrace found!");
        },
    });
}
await main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFNUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUl4RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUVuRixPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLGtCQUFrQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxFQUFFLEdBQWEsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUMxQyxNQUFNLEdBQUcsR0FBWSxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFDOUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqQyxNQUFNLEVBQUUsR0FBdUIsSUFBSSxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELE1BQU0sT0FBTyxHQUFxQixJQUFJLDRCQUE0QixFQUFFLENBQUM7SUFDckUsTUFBTSxjQUFjLEdBQTBCLElBQUksbUJBQW1CLENBQ25FLFVBQVUsQ0FDWCxDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQW1CLElBQUksZ0JBQWdCLENBQ2hELEVBQUUsRUFDRixPQUFPLEVBQ1AsY0FBYyxDQUNmLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBb0IsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV4QyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDWixHQUFHLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7WUFDeEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLHdCQUF3QixDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vbGliL21haW4uanNcIjtcbmltcG9ydCB7IEdpdGh1YkFjdGlvbklPIH0gZnJvbSBcIi4vZXh0ZXJuYWwvZ2l0aHViLWFjdGlvbi1pLW8uanNcIjtcbmltcG9ydCB7IEdpdGh1YkFjdGlvbkxvZ2dlciB9IGZyb20gXCIuL2V4dGVybmFsL2dpdGh1Yi1hY3Rpb24tbG9nZ2VyLmpzXCI7XG5pbXBvcnQgeyBab2RWYWxpZGF0b3JBZGFwdGVyIH0gZnJvbSBcIi4vbGliL2FkYXB0ZXJzL3pvZC12YWxpZGF0b3ItYWRhcHRlci5qc1wiO1xuaW1wb3J0IHsgSW5wdXRBcnJheSwgaW5wdXRBcnJheSB9IGZyb20gXCIuL2xpYi9pbnB1dHMuanNcIjtcbmltcG9ydCB7IEdpc3RLZXlWYWx1ZSB9IGZyb20gXCIuL2V4dGVybmFsL2dpc3Qta2V5LXZhbHVlLmpzXCI7XG5pbXBvcnQgeyBBY3Rpb25JTyB9IGZyb20gXCIuL2xpYi9pbnRlcmZhY2UvaW8uanNcIjtcbmltcG9ydCB7IE9jdG9raXQgfSBmcm9tIFwiQG9jdG9raXQvcmVzdFwiO1xuaW1wb3J0IHsgSW9JbnB1dFJldHJpZXZlciB9IGZyb20gXCIuL2xpYi9hZGFwdGVycy9pby1pbnB1dC1yZXRyaWV2ZXIuanNcIjtcbmltcG9ydCB7IElucHV0UmV0cmlldmVyIH0gZnJvbSBcIi4vbGliL2ludGVyZmFjZS9pbnB1dC1yZXRyaWV2ZXIuanNcIjtcbmltcG9ydCB7IEtleVZhbHVlUmVwb3NpdG9yeSB9IGZyb20gXCIuL2xpYi9pbnRlcmZhY2UvcmVwby5qc1wiO1xuaW1wb3J0IHsgQ29udGV4dFJldHJpZXZlciB9IGZyb20gXCIuL2xpYi9pbnRlcmZhY2UvY29udGV4dC1yZXRyaWV2ZXIuanNcIjtcbmltcG9ydCB7IEdpdGh1YkFjdGlvbkNvbnRleHRSZXRyaWV2ZXIgfSBmcm9tIFwiLi9leHRlcm5hbC9naXRodWItYWN0aW9uLWNvbnRleHQuanNcIjtcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gXCIuL2xpYi9pbnRlcmZhY2UvdmFsaWRhdG9yLmpzXCI7XG5pbXBvcnQgeyBIaXN0b3J5U2VydmljZSwgSUhpc3RvcnlTZXJ2aWNlIH0gZnJvbSBcIi4vbGliL3NlcnZpY2UuanNcIjtcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tIFwiLi9saWIvaW50ZXJmYWNlL2xvZ2dlci5qc1wiO1xuaW1wb3J0IHsgc2V0RmFpbGVkIH0gZnJvbSBcIkBhY3Rpb25zL2NvcmVcIjtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW86IEFjdGlvbklPID0gbmV3IEdpdGh1YkFjdGlvbklPKCk7XG4gIGNvbnN0IGxvZzogSUxvZ2dlciA9IG5ldyBHaXRodWJBY3Rpb25Mb2dnZXIoKTtcbiAgY29uc3QgYXV0aCA9IGlvLmdldChcImdpdGh1Yl90b2tlblwiKTtcbiAgY29uc3QgZ2lzdElkID0gaW8uZ2V0KFwiZ2lzdF9pZFwiKTtcbiAgY29uc3Qgb2sgPSBuZXcgT2N0b2tpdCh7IGF1dGggfSk7XG4gIGNvbnN0IGt2OiBLZXlWYWx1ZVJlcG9zaXRvcnkgPSBuZXcgR2lzdEtleVZhbHVlKG9rLCBnaXN0SWQpO1xuICBjb25zdCBjb250ZXh0OiBDb250ZXh0UmV0cmlldmVyID0gbmV3IEdpdGh1YkFjdGlvbkNvbnRleHRSZXRyaWV2ZXIoKTtcbiAgY29uc3QgaW5wdXRWYWxpZGF0b3I6IFZhbGlkYXRvcjxJbnB1dEFycmF5PiA9IG5ldyBab2RWYWxpZGF0b3JBZGFwdGVyKFxuICAgIGlucHV0QXJyYXlcbiAgKTtcbiAgY29uc3QgaW5wdXQ6IElucHV0UmV0cmlldmVyID0gbmV3IElvSW5wdXRSZXRyaWV2ZXIoXG4gICAgaW8sXG4gICAgY29udGV4dCxcbiAgICBpbnB1dFZhbGlkYXRvclxuICApO1xuXG4gIGNvbnN0IHNlcnZpY2U6IElIaXN0b3J5U2VydmljZSA9IG5ldyBIaXN0b3J5U2VydmljZShrdik7XG4gIGNvbnN0IGFwcCA9IG5ldyBBcHAoaW8sIGlucHV0LCBzZXJ2aWNlKTtcblxuICBhd2FpdCBhcHAuc3RhcnQoKS5tYXRjaCh7XG4gICAgbm9uZTogKCkgPT4ge1xuICAgICAgbG9nLmluZm8oXCLinIUgU3VjY2Vzc2Z1bGx5IHRyYWNrZWQgY29tbWl0IGFydGlmYWN0IG1ldGFkYXRhXCIpO1xuICAgIH0sXG4gICAgc29tZTogKGVycikgPT4ge1xuICAgICAgbG9nLmVycm9yKFwi4p2MIEZhaWxlZCB0byB0cmFjayBjb21taXQgYXJ0aWZhY3QgbWV0YWRhdGFcIik7XG4gICAgICBzZXRGYWlsZWQoZXJyKTtcbiAgICAgIGxvZy5lcnJvcihlcnI/LnN0YWNrID8/IFwi4p2MIE5vIHN0YWNrdHJhY2UgZm91bmQhXCIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG5hd2FpdCBtYWluKCk7XG4iXX0=