import mongoose from "mongoose";
import eventModel from "../models/event.js";

mongoose.set("debug", true);

function getEvents(name, description, due_date_time, priority) {
    let promise;
    promise = eventModel.find();
    return promise;
}

function findEventByID(id) {
    let promise;
    promise = eventModel.findById(id);
    return promise;
}

function addEvent(event) {
    const eventToAdd = new eventModel(event);
    const promise = eventToAdd.save();
    return promise;
}

function findEventByName(name) {
    return eventModel.find({ name: name });
}

function findEventByPriority(priority) {
    return eventModel.find({ priority: priority });
}

function deleteEvent(id) {
    return eventModel.findByIdAndDelete(id);
}

export default {
    addEvent,
    getEvents,
    findEventByName,
    findEventByPriority,
    deleteEvent,
    findEventByID
};
