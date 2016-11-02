# um_reminders
Urban Ministries reminder texts web app

Make a POST request to /api/visits to add new reminder calls.
Request format is a json object like below:

{
     csv_string : "last_name,first_name,phone_number,appointment_date"
}

TODO: Make Twilio calls from mongo documents
Show list of people getting called, allow for edits on page
