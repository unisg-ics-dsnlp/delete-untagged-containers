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

    // Get the current org or user
    org = context.payload.repository.full_name.split('/')[0];

    // We need to hit a different API depending on whether it's a user or not
    if (context.payload.repository.owner.type == "User") {
      type = "user";
    } else {
      type = "org";
    }

    console.log(`Detected org/user type: ${type}`)
    console.log(`Checking if package ${packageName} exists in ${type} ${org}`);
    
    pkg = await octokit.request('GET /{type}s/{name}/packages/{package_type}/{package_name}', {
      package_type: 'container',
      package_name: packageName,
      name: org,
      type: type
    })

    console.log(pkg);
    console.log(`Found package id: ${pkg.data.id}`)
    console.log(`Getting ${pkg.data.version_count} package versions`);

    pkg = await octokit.request('GET /{type}/{name}/packages/{package_type}/{package_name}', {
      package_type: 'container',
      package_name: packageName,
      name: org,
      type: type
    })

    // versions = await octokit.request('GET /user/packages/{package_type}/{package_name}/versions', {
    //   package_type: 'package_type',
    //   package_name: 'package_name'
    // })

    core.setOutput("pkg", pkg);

    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();