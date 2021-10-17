import React from 'react';
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
                    <button className="theme-switch--button" onClick={this.onClick} >
                        <svg className="theme-switch--icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 302.4 302.4">
                            <path d="M204.8 97.6C191.2 84 172 75.2 151.2 75.2s-40 8.4-53.6 22.4c-13.6 13.6-22.4 32.8-22.4 53.6s8.8 40 22.4 53.6c13.6 13.6 32.8 22.4 53.6 22.4s40-8.4 53.6-22.4c13.6-13.6 22.4-32.8 22.4-53.6s-8.4-40-22.4-53.6zm-14.4 92.8c-10 10-24 16-39.2 16s-29.2-6-39.2-16-16-24-16-39.2 6-29.2 16-39.2 24-16 39.2-16 29.2 6 39.2 16 16 24 16 39.2-6 29.2-16 39.2zM292 140.8h-30.8c-5.6 0-10.4 4.8-10.4 10.4 0 5.6 4.8 10.4 10.4 10.4H292c5.6 0 10.4-4.8 10.4-10.4 0-5.6-4.8-10.4-10.4-10.4zM151.2 250.8c-5.6 0-10.4 4.8-10.4 10.4V292c0 5.6 4.8 10.4 10.4 10.4 5.6 0 10.4-4.8 10.4-10.4v-30.8c0-5.6-4.8-10.4-10.4-10.4zM258 243.6l-22-22c-3.6-4-10.4-4-14.4 0s-4 10.4 0 14.4l22 22c4 4 10.4 4 14.4 0s4-10.4 0-14.4zM151.2 0c-5.6 0-10.4 4.8-10.4 10.4v30.8c0 5.6 4.8 10.4 10.4 10.4 5.6 0 10.4-4.8 10.4-10.4V10.4c0-5.6-4.8-10.4-10.4-10.4zM258.4 44.4c-4-4-10.4-4-14.4 0l-22 22c-4 4-4 10.4 0 14.4 3.6 4 10.4 4 14.4 0l22-22c4-4 4-10.4 0-14.4zM41.2 140.8H10.4c-5.6 0-10.4 4.8-10.4 10.4s4.4 10.4 10.4 10.4h30.8c5.6 0 10.4-4.8 10.4-10.4 0-5.6-4.8-10.4-10.4-10.4zM80.4 221.6c-3.6-4-10.4-4-14.4 0l-22 22c-4 4-4 10.4 0 14.4s10.4 4 14.4 0l22-22c4-4 4-10.4 0-14.4zM80.4 66.4l-22-22c-4-4-10.4-4-14.4 0s-4 10.4 0 14.4l22 22c4 4 10.4 4 14.4 0s4-10.4 0-14.4z" />
                        </svg>
                    </button>
                </div>
            )
        }
        
        return (
            <div className="theme-switch">
                <button className="theme-switch--button" onClick={this.onClick} >
                    <svg className="theme-switch--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001">
                        <path d="M470.218 159.659c-25.647-63.265-74.558-112.8-137.723-139.482C292.332 3.211 248.327-3.24 205.246 1.525c-18.368 2.031-32.9 15.609-36.161 33.787-3.253 18.138 5.634 35.881 22.115 44.151 31.723 15.917 56.581 42.823 69.997 75.762 30.531 74.958-5.539 160.805-80.403 191.367-32.893 13.427-69.478 14.45-103.019 2.88-17.422-6.01-36.334.042-47.056 15.061-10.702 14.991-10.283 34.805 1.04 49.306 26.682 34.168 62.01 61.167 102.167 78.08C165.931 505.399 199.648 512 233.149 512c57.539-.001 114.432-19.478 160.852-57.037 8.587-6.948 9.917-19.542 2.968-28.13-6.948-8.589-19.543-9.916-28.13-2.968-61.963 50.137-146.025 62.086-219.386 31.189-33.879-14.269-63.675-37.034-86.165-65.835-.396-.507-.544-.697-.011-1.443.567-.795.864-.691 1.454-.487 42.714 14.734 89.302 13.434 131.18-3.661 95.269-38.892 141.175-148.121 102.332-243.492-17.073-41.917-48.717-76.162-89.104-96.427-.598-.299-.845-.423-.682-1.335.176-.978.534-1.017 1.184-1.089 36.303-4.014 73.405 1.429 107.287 15.742 53.315 22.52 94.587 64.307 116.216 117.66 21.631 53.358 21.12 112.131-1.438 165.493a220.025 220.025 0 01-3.42 7.677c-4.687 10.004-.378 21.911 9.626 26.599 10.004 4.686 21.911.375 26.598-9.626a262.49 262.49 0 004.042-9.073c26.717-63.2 27.309-132.842 1.666-196.098z" />
                    </svg>
                </button>
            </div>
        )
    }
}

export default ThemeSwitch;
