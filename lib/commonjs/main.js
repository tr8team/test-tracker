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
        },
    });
}
await main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFNUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUl4RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUVuRixPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLGtCQUFrQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxFQUFFLEdBQWEsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUMxQyxNQUFNLEdBQUcsR0FBWSxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFDOUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqQyxNQUFNLEVBQUUsR0FBdUIsSUFBSSxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVELE1BQU0sT0FBTyxHQUFxQixJQUFJLDRCQUE0QixFQUFFLENBQUM7SUFDckUsTUFBTSxjQUFjLEdBQTBCLElBQUksbUJBQW1CLENBQ25FLFVBQVUsQ0FDWCxDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQW1CLElBQUksZ0JBQWdCLENBQ2hELEVBQUUsRUFDRixPQUFPLEVBQ1AsY0FBYyxDQUNmLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBb0IsSUFBSSxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV4QyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDWixHQUFHLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7WUFDeEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCB9IGZyb20gXCIuL2xpYi9tYWluLmpzXCI7XG5pbXBvcnQgeyBHaXRodWJBY3Rpb25JTyB9IGZyb20gXCIuL2V4dGVybmFsL2dpdGh1Yi1hY3Rpb24taS1vLmpzXCI7XG5pbXBvcnQgeyBHaXRodWJBY3Rpb25Mb2dnZXIgfSBmcm9tIFwiLi9leHRlcm5hbC9naXRodWItYWN0aW9uLWxvZ2dlci5qc1wiO1xuaW1wb3J0IHsgWm9kVmFsaWRhdG9yQWRhcHRlciB9IGZyb20gXCIuL2xpYi9hZGFwdGVycy96b2QtdmFsaWRhdG9yLWFkYXB0ZXIuanNcIjtcbmltcG9ydCB7IElucHV0QXJyYXksIGlucHV0QXJyYXkgfSBmcm9tIFwiLi9saWIvaW5wdXRzLmpzXCI7XG5pbXBvcnQgeyBHaXN0S2V5VmFsdWUgfSBmcm9tIFwiLi9leHRlcm5hbC9naXN0LWtleS12YWx1ZS5qc1wiO1xuaW1wb3J0IHsgQWN0aW9uSU8gfSBmcm9tIFwiLi9saWIvaW50ZXJmYWNlL2lvLmpzXCI7XG5pbXBvcnQgeyBPY3Rva2l0IH0gZnJvbSBcIkBvY3Rva2l0L3Jlc3RcIjtcbmltcG9ydCB7IElvSW5wdXRSZXRyaWV2ZXIgfSBmcm9tIFwiLi9saWIvYWRhcHRlcnMvaW8taW5wdXQtcmV0cmlldmVyLmpzXCI7XG5pbXBvcnQgeyBJbnB1dFJldHJpZXZlciB9IGZyb20gXCIuL2xpYi9pbnRlcmZhY2UvaW5wdXQtcmV0cmlldmVyLmpzXCI7XG5pbXBvcnQgeyBLZXlWYWx1ZVJlcG9zaXRvcnkgfSBmcm9tIFwiLi9saWIvaW50ZXJmYWNlL3JlcG8uanNcIjtcbmltcG9ydCB7IENvbnRleHRSZXRyaWV2ZXIgfSBmcm9tIFwiLi9saWIvaW50ZXJmYWNlL2NvbnRleHQtcmV0cmlldmVyLmpzXCI7XG5pbXBvcnQgeyBHaXRodWJBY3Rpb25Db250ZXh0UmV0cmlldmVyIH0gZnJvbSBcIi4vZXh0ZXJuYWwvZ2l0aHViLWFjdGlvbi1jb250ZXh0LmpzXCI7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiLi9saWIvaW50ZXJmYWNlL3ZhbGlkYXRvci5qc1wiO1xuaW1wb3J0IHsgSGlzdG9yeVNlcnZpY2UsIElIaXN0b3J5U2VydmljZSB9IGZyb20gXCIuL2xpYi9zZXJ2aWNlLmpzXCI7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSBcIi4vbGliL2ludGVyZmFjZS9sb2dnZXIuanNcIjtcbmltcG9ydCB7IHNldEZhaWxlZCB9IGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGlvOiBBY3Rpb25JTyA9IG5ldyBHaXRodWJBY3Rpb25JTygpO1xuICBjb25zdCBsb2c6IElMb2dnZXIgPSBuZXcgR2l0aHViQWN0aW9uTG9nZ2VyKCk7XG4gIGNvbnN0IGF1dGggPSBpby5nZXQoXCJnaXRodWJfdG9rZW5cIik7XG4gIGNvbnN0IGdpc3RJZCA9IGlvLmdldChcImdpc3RfaWRcIik7XG4gIGNvbnN0IG9rID0gbmV3IE9jdG9raXQoeyBhdXRoIH0pO1xuICBjb25zdCBrdjogS2V5VmFsdWVSZXBvc2l0b3J5ID0gbmV3IEdpc3RLZXlWYWx1ZShvaywgZ2lzdElkKTtcbiAgY29uc3QgY29udGV4dDogQ29udGV4dFJldHJpZXZlciA9IG5ldyBHaXRodWJBY3Rpb25Db250ZXh0UmV0cmlldmVyKCk7XG4gIGNvbnN0IGlucHV0VmFsaWRhdG9yOiBWYWxpZGF0b3I8SW5wdXRBcnJheT4gPSBuZXcgWm9kVmFsaWRhdG9yQWRhcHRlcihcbiAgICBpbnB1dEFycmF5XG4gICk7XG4gIGNvbnN0IGlucHV0OiBJbnB1dFJldHJpZXZlciA9IG5ldyBJb0lucHV0UmV0cmlldmVyKFxuICAgIGlvLFxuICAgIGNvbnRleHQsXG4gICAgaW5wdXRWYWxpZGF0b3JcbiAgKTtcblxuICBjb25zdCBzZXJ2aWNlOiBJSGlzdG9yeVNlcnZpY2UgPSBuZXcgSGlzdG9yeVNlcnZpY2Uoa3YpO1xuICBjb25zdCBhcHAgPSBuZXcgQXBwKGlvLCBpbnB1dCwgc2VydmljZSk7XG5cbiAgYXdhaXQgYXBwLnN0YXJ0KCkubWF0Y2goe1xuICAgIG5vbmU6ICgpID0+IHtcbiAgICAgIGxvZy5pbmZvKFwi4pyFIFN1Y2Nlc3NmdWxseSB0cmFja2VkIGNvbW1pdCBhcnRpZmFjdCBtZXRhZGF0YVwiKTtcbiAgICB9LFxuICAgIHNvbWU6IChlcnIpID0+IHtcbiAgICAgIGxvZy5lcnJvcihcIuKdjCBGYWlsZWQgdG8gdHJhY2sgY29tbWl0IGFydGlmYWN0IG1ldGFkYXRhXCIpO1xuICAgICAgc2V0RmFpbGVkKGVycik7XG4gICAgfSxcbiAgfSk7XG59XG5cbmF3YWl0IG1haW4oKTtcbiJdfQ==