import React from 'react';
import Input from '../../shared/components/FormElements/input';
import Button from '../../shared/components/FormElements/Button';

import { useForm } from '../../shared/hooks/form-hook';

import './Auth.css';

import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import Card from '../../shared/components/UiElements/Card';

const Auth = () => {
	const [formState, InputHandler] = useForm(
		{
			username: { value: '', isValid: false },
			password: { value: '', isValid: false },
		},
		false
	);

	const onSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs); //send to BackEnd
	};

	return (
			<Card className="auth">
                <h2>Login required</h2>
                <hr/>
            <form className="place-form" onSubmit={onSubmitHandler}>
				<Input
					id="username"
					element="input"
					type="text"
					label="Username"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="wrong Username format."
					onInput={InputHandler}
				/>
				<Input
					id="password"
					element="input"
					type="text"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(8)]}
					errorText="Incorrect Password."
					onInput={InputHandler}
				/>

				<Button type="submit" disabled={!formState.isValid}>
					{' '}
					SIGN IN
				</Button>
			</form>
            </Card>
	);
};

export default Auth;
