import React, { useEffect, useState } from 'react';
import './terminal.css'

export const Terminal = props => {
    const [content, setContent] = useState([
        { inputed: false, text: "Welcome to Cybercursed!" },
        { inputed: false, text: "use \"commands\" to see available commands." },
    ]);
    const [input, setInput] = useState("");
    const [command, setCommand] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [sched, setSched] = useState(0);

    useEffect(() => {
        document.getElementById('terminal__input').focus();
        switch (sched) {
            case 1:
                parseCommands();
                break;
            case 2:
                setIsDisabled(false);
                setSched(0);
                break;
            default:
                break;
        }
    });

    function parseCommands() {
        const response = [...content];
        switch (command) {
            case 'commands':
                response.push({inputed: false, text: 'commands login'});
                setContent(response);
                setSched(2);
                return;
            case 'login':
                if (command.split(" ").length < 3) {
                    response.push({inputed: false, text: 'usage: login <username> <password>'});
                    setContent(response);
                    setSched(2);
                    return;
                }
                const username = command.split(" ")[1];
                const password = command.split(" ")[2];
                response.push({inputed: false, text: 'trying to login...'});
                setContent(response);
                response.push({inputed: false, text: 'fail...'});
                setContent(response);
                setSched(2);
                return;
            case 'waiting':
                return;
            default:
                response.push({inputed: false, text: `command "${command.split(" ")[0]}" not found.`});
                setContent(response);
                setSched(2);
                return;
        }
    }

    function renderContent() {
        const rendered = [];
        for( let line of content) {
            if (line.inputed)
                rendered.push(
                    <li className="list__item"><b>[root@cybercursed]></b> {line.text}</li>
                );
            else
                rendered.push(
                    <li className="list__item">{line.text}</li>
                );
        }
        return rendered;
    }

    function changeInput(event) {
        setInput(event.target.value);
    }

    function submitCommand(event) {
        event.preventDefault();
        const payload = [...content];
        payload.push({inputed: true, text: input});
        setCommand(input);
        setInput("");
        setContent(payload);
        setIsDisabled(true);
        setSched(1);
    }

    return (
        <div className="terminal__container">
            <figure className="terminal">
                <figcaption>Cybershell</figcaption>
                <div className="terminal__content">
                    <ul className="content__list">
                        {renderContent()}
                    </ul>
                    <form className="terminal__form" onSubmit={submitCommand} autocomplete="off">
                        <span className={`terminal__prefix ${isDisabled ? "terminal__prefix--disabled" : ""}`}>
                            <input
                                id="terminal__input" 
                                type="text" 
                                className="terminal__input" 
                                value={input} 
                                disabled={isDisabled}
                                onChange={changeInput}
                            >
                            </input>
                        </span>
                    </form>
                </div>
            </figure>
        </div>
    );
}

