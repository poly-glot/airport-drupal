'use client';

import type { ReactNode } from 'react';
import { enhanceBoardSearch, enhanceSplitFlap, enhanceStatusTips, enhanceTabs } from '@/lib/behaviours';
import { useEnhance } from '@/lib/use-enhance';
import '@/components/button/index.css';
import './index.css';
import './tabs.css';

interface FlightBoardProps {
    title: string;
    titleId: string;
    meta?: string;
    clockTime: string;
    overlapped?: boolean;
    showSearch?: boolean;
    departuresSearchLabel?: string;
    arrivalsSearchLabel?: string;
    departuresCaption?: string;
    arrivalsCaption?: string;
    allDeparturesLabel?: string;
    allDeparturesHref?: string;
    allArrivalsLabel?: string;
    allArrivalsHref?: string;
    departures?: ReactNode;
    arrivals?: ReactNode;
}

interface BoardPanelProps {
    direction: 'departures' | 'arrivals';
    heading: string;
    placeHeading: string;
    gateHeading: string;
    showSearch?: boolean;
    searchLabel?: string;
    caption?: string;
    allLabel?: string;
    allHref?: string;
    rows?: ReactNode;
}

const enhanceStatusTipsOnce = () => enhanceStatusTips();

function BoardPanel({
    direction,
    heading,
    placeHeading,
    gateHeading,
    showSearch,
    searchLabel,
    caption,
    allLabel,
    allHref,
    rows,
}: BoardPanelProps) {
    const searchId = `${direction}-search`;

    return (
        <div className="tabs__panel board__panel" id={direction} tabIndex={-1}>
            <div className="board__body container">
                {showSearch && (
                    <div className="board__search">
                        <label className="visually-hidden" htmlFor={searchId}>
                            {searchLabel}
                        </label>
                        <div className="field__control">
                            <svg
                                className="field__icon board__search-icon"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7"></circle>
                                <path d="M20 20l-4-4"></path>
                            </svg>
                            <input
                                className="field__input field__input--with-icon field__input--dark"
                                id={searchId}
                                type="search"
                                placeholder={`Search ${direction} by flight or city`}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                )}
                <section className="board__scroll" aria-label={`${heading} board`} tabIndex={0}>
                    <table className="board__table">
                        <caption className="visually-hidden">{caption}</caption>
                        <thead>
                            <tr>
                                <th scope="col">Time</th>
                                <th scope="col">{placeHeading}</th>
                                <th scope="col">Flight</th>
                                <th scope="col">Terminal</th>
                                <th scope="col">{gateHeading}</th>
                                <th scope="col">Status</th>
                                <th scope="col">Info</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </section>
                <div className="board__foot">
                    <ul className="board__legend">
                        <li className="board__legend-item">
                            <span className="board__swatch board__swatch--ok"></span>On time / landed
                        </li>
                        <li className="board__legend-item">
                            <span className="board__swatch board__swatch--info"></span>Boarding / gate open
                        </li>
                        <li className="board__legend-item">
                            <span className="board__swatch board__swatch--warn"></span>Delayed
                        </li>
                        <li className="board__legend-item">
                            <span className="board__swatch board__swatch--bad"></span>Cancelled
                        </li>
                    </ul>
                    {allLabel && (
                        <a className="button button--ghost" href={allHref ?? ''}>
                            {allLabel}
                            <svg
                                className="text-link__icon"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                aria-hidden="true"
                            >
                                <path d="M9 6l6 6-6 6"></path>
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function FlightBoard({
    title,
    titleId,
    meta = '',
    clockTime,
    overlapped,
    showSearch,
    departuresSearchLabel,
    arrivalsSearchLabel,
    departuresCaption,
    arrivalsCaption,
    allDeparturesLabel,
    allDeparturesHref,
    allArrivalsLabel,
    allArrivalsHref,
    departures,
    arrivals,
}: FlightBoardProps) {
    const ref = useEnhance<HTMLElement>(enhanceTabs, enhanceBoardSearch, enhanceSplitFlap, enhanceStatusTipsOnce);
    const className = overlapped ? 'board board--overlapped tabs on-dark' : 'board tabs on-dark';

    return (
        <section ref={ref} className={className} id="live-flights" aria-labelledby={titleId}>
            <div className="board__head container">
                <div className="board__titles">
                    <h2 className="board__title" id={titleId}>
                        {title}
                    </h2>
                    <p className="board__meta">
                        <span className="board__dot"></span>
                        <span>
                            {'Updated '}
                            <span className="board__updated">{clockTime}</span>
                            {` · ${meta}`}
                        </span>
                    </p>
                </div>
                <p className="board__clock">
                    <span className="board__clock-time" data-flap="5">
                        {clockTime}
                    </span>
                    <span className="board__clock-label">Local time</span>
                </p>
            </div>
            <div className="board__tabbar">
                <div className="tabs__list container" data-tabs-label="Flight board">
                    <a className="tabs__tab" href="#departures">
                        <svg
                            className="tabs__tab-icon"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M3 21h18M4 15l16-5-3-5-5 2-5-4-2 1 3 5-4 1-2-2-2 1z"></path>
                        </svg>
                        Departures
                    </a>
                    <a className="tabs__tab" href="#arrivals">
                        <svg
                            className="tabs__tab-icon"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M3 21h18M4 11l16 5 1-5-5-2-3-6-2-1v6l-4-1-1-3-2 1z"></path>
                        </svg>
                        Arrivals
                    </a>
                </div>
            </div>
            <div>
                <BoardPanel
                    direction="departures"
                    heading="Departures"
                    placeHeading="To"
                    gateHeading="Gate"
                    showSearch={showSearch}
                    searchLabel={departuresSearchLabel}
                    caption={departuresCaption}
                    allLabel={allDeparturesLabel}
                    allHref={allDeparturesHref}
                    rows={departures}
                />
                <BoardPanel
                    direction="arrivals"
                    heading="Arrivals"
                    placeHeading="From"
                    gateHeading="Belt"
                    showSearch={showSearch}
                    searchLabel={arrivalsSearchLabel}
                    caption={arrivalsCaption}
                    allLabel={allArrivalsLabel}
                    allHref={allArrivalsHref}
                    rows={arrivals}
                />
            </div>
            <p className="visually-hidden" role="status" data-flap-announcer=""></p>
        </section>
    );
}
