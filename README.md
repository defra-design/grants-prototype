# Farming Grants Prototype

The working prototype for the Capgemini project working on Defra farming grants. The aim of the prototype is to assist with the design and research of farming grants elgibility checkers and applications.

## Web access

To access the currently deployed prototype visit the following URL:
https://grants-prototype2.herokuapp.com/

## Notes for contributors

To contribute to the prototype make sure to work on a branch. You may merge your own branches to `master` and resolve conflicts without a reviewer.

### Branch naming conventions

Name your branch something human-readable that includes your name and describes the work you are performing, for example, `mark-adding-validation` or `suzy-v4-content-amends`

### Deployments

The prototype is deployed through Heroku, under the project name `grants-prototype2`. To deploy the `master` branch, first make sure you have installed the [Heroku CLI tools](https://devcenter.heroku.com/articles/heroku-cli) then run `$ heroku login`. Once you are logged in you should remain logged in and you should not need to do this again unless you are cloning the repo again.

#### Deployment steps

1. Make changes, commit and merge them following the standard git practices.
2. Run `$ heroku git:remote -a grants-prototype2`
3. Run `$ git push heroku master`

Once these steps have been performed you should see the terminal output the deployment status, once this is complete the changes will be live at the access URL (above).

## Team contacts

If you need access to information about this prototype, would like to contribute, or have questions about the team’s work; please contact the interaction design team:

| Name           | Email address                |
| -------------- | ---------------------------- |
| Hassan Mahmood | hassan.mahmood@capgemini.com |
| David Todd     | david.todd@capgemini.com     |
| Harnick Virdee | harnick.virdee@capgemini.com |
