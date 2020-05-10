import React from 'react';
import '../Navigation/Navigation.css';

function Navigation() {
    return (
        <div className="nav">
            <ul className="nav__list">
                <li className="nav__list-items">
                    <a href="/" className="nav__list-link">
                        <div className="nav__list-icon">
                            <i className="fas fa-home fa-lg"></i>
                        </div>
                        <div className="nav__list-name">
                            커뮤니티
                        </div>
                    </a>
                </li>

                <li className="nav__list-items">
                    <a href="/search" className="nav__list-link">
                        <div className="nav__list-icon">
                            <i className="fas fa-search fa-lg"></i>
                        </div>
                        <div className="nav__list-name">
                            추천
                        </div>
                    </a>
                </li>

                <li className="nav__list-items">
                    <a href="/" className="nav__list-link">
                        <div className="nav__list-icon">
                            <i className="far fa-heart fa-lg"></i>
                        </div>
                        <div className="nav__list-name">
                            타임라인
                        </div>
                    </a>
                </li>

                <li className="nav__list-items">
                    <a href="/login" className="nav__list-link">
                        <div className="nav__list-icon">
                            <i className="fas fa-user fa-lg"></i>
                        </div>
                        <div className="nav__list-name">
                            마이페이지
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;