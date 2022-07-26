import { getBookings, getSlots } from "../booking.js";
import { getExtendedCourseInfo } from "../course.js";
import { getCoursesInfo } from "../courses.js";
import { Device } from "../device.js";
import { getDownloadURL } from "../material.js";
import { getTicket, getTickets } from "../tickets.js";
import { getTimetable } from "../timetable.js";
import { getUnreadMail } from "../user.js";
import { ping } from "../utils.js";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4();
const device = new Device(uuid);
(async () => {
	await ping();
	await device.register();
	const { token } = await device.loginWithCredentials("S123456", "password");
	console.log("Token:", token);
	console.log("Unread mail:", await getUnreadMail(device));
	console.log("Timetable:", await getTimetable(device));
	const courses_info = await getCoursesInfo(device);
	console.log("Courses:", courses_info);
	const course = await getExtendedCourseInfo(device, courses_info.course_plan.standard[2]!);
	console.log("Course:", course);
	console.log(courses_info.course_plan.standard[2]);
	console.log(await getDownloadURL(device, 33278489));
	const bookings = await getBookings(device);
	console.log("Bookings:", bookings);
	console.log(await getSlots(device, "AULE_STUDIO", "AS_LINGOTTO_2", new Date("2021-12-21T12:03:04.564Z")));
	console.log(await getTickets(device));
	console.log(await getTicket(device, 1126458));
	await device.logout();
})();
