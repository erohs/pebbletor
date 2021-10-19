import React from 'react';
import MoonIcon from '../Icons/MoonIcon';
import SunIcon from '../Icons/SunIcon';
import { IThemeSwitchState } from './interfaces/IThemeSwitchState';
import './style/ThemeSwitch.css';

class ThemeSwitch extends React.Component {
    state: IThemeSwitchState = { checked: true }

    componentDidMount() {
        localStorage.getItem('theme') === 'dark-theme' ? this.setTheme('dark-theme') : this.setTheme('light-theme');
    }

    setTheme = (themeName: string) => {
        themeName === "light-theme" ? this.setState({ checked: false }): this.setState({ checked: true });
        localStorage.setItem('theme', themeName);
        document.querySelector('body')!.className = themeName;
    }

    onClick = () => {
        const updateChecked = !this.state.checked;
        const themeName = updateChecked ? "dark-theme" : "light-theme";
        this.setTheme(themeName);
    }

    render() {
        if (this.state.checked) {
            return (
                <div className="theme-switch">
                    <button className="theme-switch__button" onClick={this.onClick} >
                        <SunIcon className="theme-switch__icon--sun" />
                    </button>
                </div>
            )
        }
        
        return (
            <div className="theme-switch">
                <button className="theme-switch__button" onClick={this.onClick} >
                    <MoonIcon className="theme-switch__icon" />
                </button>
            </div>
        )
    }
}

export default ThemeSwitch;
