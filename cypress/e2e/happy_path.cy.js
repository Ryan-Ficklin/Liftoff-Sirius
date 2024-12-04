// This one test walks through the entire app, starting at / (Home page)
// logging in, creating, editing, and deleting a task, and viewing
// the calender
describe("The Happy Path", () => {
    it("Does Everything", () => {
        const testdata = {
            name: "cypresstest",
            // this feels wrong but unavoidable
            pass: "cypress",
            // this is all the data for the first task
            task1_name: "Start Cypress Testing",
            task1_description: "This is the first task that cypress adds",
            task1_priority: "5",
            task1_new_priority: "7",
            task1_date_range: [2020, 2029],
            task1_year: "2024",
            task1_month: "Dec",
            task1_day: "2",
            task1_calender_date: new Date("December 1, 2024"), //needs to be the first, for calender to work

            // this is all the data for the second task
            task2_name: "Complete Cypress Testing",
            task2_description:
                "This is the second tasks cypress will add, and it is higher priority",
            task2_priority: "6",
            task2_date_range: [2010, 2019],
            task2_year: "2019",
            task2_month: "Mar",
            task2_day: "20",
            task2_calender_date: new Date("March 1, 2019") // also needs to be the first
        };
        // these are some helper functions to correctly navigate to a date range
        // when using the date dialog box when creating a task

        // this gets the date range from the navbar as integers
        const extractDecadeRange = (text) => {
            const [start, end] = text.split("-").map((year) => parseInt(year.trim(), 10));
            return [start, end];
        };

        // task creating date navigation (not calender view navigation)
        // this navigates the correct decade, no matter if it is past, present, or future
        const navigateToTargetDecade = (targetDateRange) => {
            cy.get('[data-pc-section="decadetitletext"]')
                .invoke("text")
                .then((currentDecadeText) => {
                    // get date from the shown date range
                    const currentDecade = extractDecadeRange(currentDecadeText);

                    // navigate recursively if not on the correct date
                    if (currentDecade[0] < targetDateRange[0]) {
                        // click the right arrow to go forward in time
                        cy.get('button[data-pc-section="nextbutton"]').click();
                        // recursively call the function until correct decade is found
                        navigateToTargetDecade(targetDateRange);
                    } else if (currentDecade[0] > targetDateRange[0]) {
                        // same thing but for going back
                        cy.get('button[data-pc-section="previousbutton"]').click();
                        navigateToTargetDecade(targetDateRange);
                    }
                });
        };

        // calender view navigation. very similar to date selection
        // menu helpers, but not quite the same
        // this turn the Date shown on the calender into a Date instead of an
        // int, because this time were working with month, year, instead of year - year
        const extractCalenderDate = (text) => {
            const [month, year] = text.split(" ");
            // must have a day in order to be a proper date, so just choose 1
            return new Date(`${month} 1, ${year}`);
        };

        const navigateToCalenderMonth = (targetDate) => {
            cy.get('[class="fc-toolbar-title"]')
                .invoke("text")
                .then((currentDateText) => {
                    const currentDate = extractCalenderDate(currentDateText);

                    // familiar recursive navigation
                    if (currentDate < targetDate) {
                        cy.get('button[title="Next month"]').click();
                        navigateToCalenderMonth(targetDate);
                    } else if (currentDate > targetDate) {
                        cy.get('button[title="Previous month"]').click();
                        navigateToCalenderMonth(targetDate);
                    }
                    console.log("Date          ", currentDate);
                    console.log("Date          ", targetDate);
                });
        };

        // log in using cypress testing credentials
        cy.visit("https://orange-flower-05ec8ee1e.5.azurestaticapps.net/");
        cy.get('input[id="username"]').type(testdata.name);
        cy.get('input[id="password"]').type(testdata.pass);
        cy.get('button[class="login-btn"]').click();

        // creates its first task from the no tasks found component
        cy.contains("No Tasks Found");
        cy.contains("Create Task").click();
        cy.get('input[name="name"]').type(testdata.task1_name);
        cy.get('textarea[name="description"]').type(testdata.task1_description);
        cy.get('input[name="priority"]').type(testdata.task1_priority);
        // this clicks through all the dailog to choose a date, and its future proof!
        cy.get('input[name="due_date_time"]').click();
        cy.get('button[class="p-datepicker-month p-link"]').click();
        cy.get('button[class="p-datepicker-year p-link"]').click();
        navigateToTargetDecade(testdata.task1_date_range);
        cy.get('[data-pc-section="year"]').contains(testdata.task1_year).click();
        cy.get('[data-pc-section="month"]').contains(testdata.task1_month).click();
        cy.get('[data-pc-section="daylabel"]').contains(testdata.task1_day).click();
        cy.get('button[class="dialog-add-task-btn"]').click();

        // this creates the second task from the task list view
        cy.get('button[class="add-btn"]').click();
        // all of this code is duplicate, and it could be more clever to reduce
        // duplicate code, but why complicate things?
        cy.get('input[name="name"]').type(testdata.task2_name);
        cy.get('textarea[name="description"]').type(testdata.task2_description);
        cy.get('input[name="priority"]').type(testdata.task2_priority);
        cy.get('input[name="due_date_time"]').click();
        cy.get('button[class="p-datepicker-month p-link"]').click();
        cy.get('button[class="p-datepicker-year p-link"]').click();
        navigateToTargetDecade(testdata.task2_date_range);
        cy.get('[data-pc-section="year"]').contains(testdata.task2_year).click();
        cy.get('[data-pc-section="month"]').contains(testdata.task2_month).click();
        cy.get('[data-pc-section="daylabel"]').contains(testdata.task2_day).click();
        cy.get('button[class="dialog-add-task-btn"]').click();

        // check if task2 is above task1, seeing as it is higher priority
        // get all tasks in the table
        cy.get(".TableTask").then((tasks) => {
            // convert the tasks to an array for easier manipulation
            const taskArray = [...tasks];

            // extract the task names using jquery (idk why it works but it does)
            const taskNames = taskArray.map((task) =>
                Cypress.$(task).find(".task-name").text().trim()
            );

            // verify that Task2 appears before Task1
            expect(taskNames.indexOf(testdata.task2_name)).to.be.lessThan(
                taskNames.indexOf(testdata.task1_name)
            );
        });

        // now can check that the tasks appear in the calender view
        cy.get('button[class="toggle-option "]').click();

        // go to the correct calender view for task1
        navigateToCalenderMonth(testdata.task1_calender_date);
        // make sure task1 is on the calender
        cy.contains(".fc-event-title.fc-sticky", testdata.task1_name) // select by class and text
            .should("be.visible"); // asserts its visbility

        // same thing for task2
        navigateToCalenderMonth(testdata.task2_calender_date);
        cy.contains(".fc-event-title.fc-sticky", testdata.task2_name).should(
            "be.visible"
        );

        // go back to do list
        cy.get('button[class="toggle-option "]').click();

        //edit specifically task1 to make it higher priority
        cy.contains(".task-name", testdata.task1_name) // find the task with task1's name
            .closest(".TableTask") // find the closest parent task container
            .find('i[class="icon pi pi-pen-to-square"]') // find the edit button
            .click();

        // clear the field so that it deletes the exisiting priority
        cy.get('input[name="priority"]').clear().type(testdata.task1_new_priority);
        cy.get('button[class="dialog-add-task-btn"]').click();
        // wait for a half second for the tasks to change (clunky, but it will do)
        cy.wait(1000);
        // now task1 should appear before task2
        cy.get(".TableTask").then((tasks) => {
            const taskArray = [...tasks];
            const taskNames = taskArray.map((task) =>
                Cypress.$(task).find(".task-name").text().trim()
            );
            expect(taskNames.indexOf(testdata.task1_name)).to.be.lessThan(
                taskNames.indexOf(testdata.task2_name)
            );
        });

        // now delete both items, so that this test can be re-run without side effects
        // selecting delete is the same as edit but with the second delete button instead of the first
        cy.contains(".task-name", testdata.task1_name)
            .closest(".TableTask")
            .find('i[class="trash-icon icon pi pi-trash"]') // find delete button
            .click();
        cy.contains(".task-name", testdata.task2_name)
            .closest(".TableTask")
            .find('i[class="trash-icon icon pi pi-trash"]')
            .click();

        cy.get('button[class="logout-btn"]').click();
    });
});
