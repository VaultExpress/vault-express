# the-vault project - ALPHA stage

A simply secure sign-up/sign-in implementation for web app. You may consider this as runnable guideline for your implementation.

[LIVE DEMO](https://peaceful-peak-41153.herokuapp.com/)

This project demonstrates the secure web app by using 3 public web pages and 1 protected user profile page

**Public pages**
* /landing
* /signup
* /signin

**Protected page**
* /profile

## Why create this project?
After I went through for many programming tutorials, I thought It was time to create some web app myself.

The first thing in my head was "What should I create?" (the big question in my life) and then the next question was "Which framework should I use for frontend, backend and database?" and then again and again many questions pop into.

But a big common question for most web application that is "How can I secure the content inside my app?"

Sound easy at first for newbie as me, just create a page for sign-in. BUT the truth never be easy like that.

I did search for this topic and found scattered information spreads all over internet. Those infomation will give me wrinkles, I don't want to be an expert on this topic, I just want to create an app with acceptable secure.

Then I create this project with hope that opensource community will help me out, As always. and also to help people with the same situation as me to solve this issue.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to install PostgreSQL to run on your machine

https://www.postgresql.org/docs/manualsindex/

### Installing

```
git clone https://github.com/VaultExpress/the-vault.git

cd the-vault

npm init
```

For environment vairables we use .env file which you can see what we use in .env-example

and then you can start the server by

```
npm start
```

## Running the tests

```
npm test
```

## Deployment

```
npm run deploy
```

## Built With

* [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Helmet](https://helmetjs.github.io/) - Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](
https://github.com/VaultExpress/the-vault/tags).

## Authors

* **Jun Yada** - *Initial work* - [junyada100](https://github.com/junyada100)

See also the list of [contributors](https://github.com/VaultExpress/the-vault/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [Vecteezy](https://www.Vecteezy.com/) - Vector illustration credit: <a rel="nofollow" href="https://www.Vecteezy.com/">Vecteezy</a>
