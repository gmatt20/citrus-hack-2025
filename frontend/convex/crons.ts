import {cronJobs} from "convex/server";
import {internal} from "./_generated/api"

const crons = cronJobs();

crons.interval (
    "clear messages table",
    {minutes: 60},
    internal.notes.deleteAll);

export default crons;