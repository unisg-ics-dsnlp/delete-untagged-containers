const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: core.getInput('token') });

octokit.hook.error("request", async (error, options) => {
  throw error;
});

const run = async () => {
  try {
    const packageName = core.getInput('package_name');
    const context = github.context;

    // Get the org. Default to current org
    org = core.getInput('org') || context.payload.repository.full_name.split('/')[0];

    console.log(`Trying to delete untagged versions of ${packageName} from org ${org}`);
    
    pkg = await octokit.request('GET /orgs/{org}/packages/{package_type}/{package_name}', {
      package_type: 'container',
      package_name: packageName,
      org: org
    })

    console.log(pkg);
    core.setOutput("pkg", pkg);

    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();