// an event is similar to a task, but contains
// a start time and an end time, rather than a due date
// also does not have a priority, because it only occurs during
// the defined times

import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        start_date_time: {
            type: Date,
            required: true
        },
        end_date_time: {
            type: Date,
            required: true
        },
    },
    { collection: "events_list" }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;