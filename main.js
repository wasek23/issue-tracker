const updateValues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    if (issues) {
        document.getElementById("totalIssues").innerHTML = issues.length;
        let closedIssueCount = 0;

        for (let i = 0; i < issues.length; i++) {
            const currentIssue = issues[i];
            if (currentIssue.status == "Closed") {
                closedIssueCount += 1;
            }
        }
        document.getElementById("closedIssues").innerHTML = closedIssueCount;
        document.getElementById("activeIssues").innerHTML = issues.length - closedIssueCount;
    }
}
updateValues();

document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    updateValues();
    e.preventDefault();
}

const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Closed';
    if (currentIssue.status == "Closed") {
        currentIssue.description = `<span style="text-decoration: line-through;">${currentIssue.description}</span>`;
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
    updateValues();
}

const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => issue.id != id);
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    fetchIssues();
    updateValues();
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];

        issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="issueDescription"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
}
