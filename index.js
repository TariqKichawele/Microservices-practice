import UserService from './services/userService.js';
import EmailService from './services/emailService.js';
import AuthService from './services/authService.js';

async function startApp() {
    await UserService.start();
    await EmailService.start();
    await AuthService.start();

    try {

        //Simulating User
        const newUser = await UserService.call('user.createUser', {
            username: 'TOP G',
            email: 'topg@mail.com'
        });
        console.log('New user created', newUser);
        const users = await UserService.call('user.getUsers');
        console.log('All users:', users);
        console.log('')

        //Simulating Email
        const newEmail = await EmailService.call('email.sendEmail', {
            recipient: newUser.email,
            subject: 'Welcome to our platform!',
            content: 'Thank you for signing up'
        });
        console.log(newEmail);
        console.log('')

        //Simulate Auth
        const authResult = await AuthService.call('auth.authUser', {
            username: 'admin',
            password: 'password'
        });

        console.log('Auth result:', authResult);
    } catch (error) {
        console.log('Error:', error);
    } finally {
        await UserService.stop();
        await EmailService.stop();
        await AuthService.stop();
    }
}

startApp();