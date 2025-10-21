import React, { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('성함');
    const [email, setEmail] = useState('이메일 주소');
    const [message, setMessage] = useState('문의 내용을 작성해주세요.');
    const [status, setStatus] = useState(''); // invalid, success, error, reset

    const emailRegex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setStatus('invalid');
            return;
        }

        try {
            const response = await fetch('mail.mf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    name,
                    email,
                    message,
                }),
            });

            if (response.ok) {
                setName('성함');
                setEmail('이메일 주소');
                setMessage('문의 내용을 작성해주세요.');
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const handleReset = () => {
        setName('성함');
        setEmail('이메일 주소');
        setMessage('문의 내용을 작성해주세요.');
        setStatus('reset');
    };

    const handleFocus = (setter, value, defaultValue) => {
        if (value === defaultValue) setter('');
    };

    const handleBlur = (setter, value, defaultValue) => {
        if (value === '') setter(defaultValue);
    };

    return (
        <div id="faqBottom">
            <ul>
                <li className="emailInfo">
                    <h2>원하는 답변이 없나요 ?</h2>
                    <strong>1:1 문의를 남겨주세요. </strong>
                </li>
                <li>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onFocus={() => handleFocus(setName, name, '성함')}
                            onBlur={() => handleBlur(setName, name, '성함')}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            value={email}
                            onFocus={() => handleFocus(setEmail, email, '이메일 주소')}
                            onBlur={() => handleBlur(setEmail, email, '이메일 주소')}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            required
                        />
                        <textarea
                            value={message}
                            onFocus={() =>
                                handleFocus(setMessage, message, '문의 내용을 작성해주세요.')
                            }
                            onBlur={() =>
                                handleBlur(setMessage, message, '문의 내용을 작성해주세요.')
                            }
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit">Submit</button>

                        {status === 'invalid' && <div className="invalid">Invalid Email!</div>}
                        {status === 'success' && <div className="success">Email Sent!</div>}
                        {status === 'error' && <div className="error">Error!</div>}
                        {status === 'reset' && <div className="reset">Reset!</div>}
                    </form>
                </li>
            </ul>
        </div>
    );
};

export default ContactForm;
