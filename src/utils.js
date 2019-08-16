import dotenv from 'dotenv';
import path from 'path';
import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

//console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

const sendMail = email => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	};
	const client = nodemailer.createTransport(sgTransport(options));
	return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'ashburn1207@gmail.com',
		to: address,
		subject: '🔑 Login Secret for Mystagram 🔑',
		html: `Hello! Your login secret is ${secret}.<br/>Copy paste on the app/website to log in<br/>`
	};
	return sendMail(email);
};
