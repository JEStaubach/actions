const github = require("@actions/github");
const core = require("@actions/core");
const graphql = require("@octokit/graphql");
const actions = require("@jestaubach/actions");

async function run() {
  const myToken = core.getInput("action-token");
  const boardName = core.getInput("board-name");
  const columnName = core.getInput("column-name");
  const octokit = new github.GitHub(myToken);
  const context = github.context;
  
  console.log(
    `>> Action triggered by issue #${context.issue.number}\n`,
    `   << Move unassigned issue card.`
  );
  await actions.githubProjects.moveCardsMatchingIssueToCorrectColumn(octokit, context);
  ;
}

run()
  .then(
    (response) => { console.log(`Finished running: ${response}`); },
    (error) => { 
      console.log(`#ERROR# ${error}`);
      process.exit(1); 
    }
  );
