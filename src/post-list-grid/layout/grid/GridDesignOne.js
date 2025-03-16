import img1 from "./../../images/one.jpg";
import img2 from "./../../images/two.jpg";
import img3 from "./../../images/three.jpg";

const GridDesignOne = ({ attributes }) => {
    const param = attributes;

    return (
        <div className="grid-one experimental-block-post-grid-tab-content-wrapper">
            {param.gridColumn &&
                <div className={`col-${param.gridColumn}`}>
                    <div className="experimental-block-post-grid-tab-content active" data-tab="uncategorized">
                        <article>
                            <div className="grid-item-wrapper clear">
                                {
                                    param.showThumbnail &&
                                    <div className="featured-image" style={{ backgroundImage: `url(${img2})` }}>
                                    </div>
                                }
                                <div className="entry-container clear">
                                    <header className="entry-header">
                                        <h2 className="entry-title">
                                            <a href="#" tabindex="0">Turkey – Let’s go and enjoy</a></h2>
                                    </header>
                                    <div className="entry-meta">
                                        {
                                            param.showAuthor &&
                                            <span className="post-author"><i className="fas fa-user"></i> Admin</span>
                                        }
                                        {
                                            param.showDate &&
                                            <span className="post-date"><i className="fas fa-calendar"></i> Aug 01 2024</span>
                                        }


                                    </div>
                                    <div className="entry-content">
                                        {
                                            param.showExcert &&
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                <a href="#" className="more-link">Read More</a>
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div className="grid-item-wrapper clear">
                                {
                                    param.showThumbnail &&
                                    <div className="featured-image" style={{ backgroundImage: `url(${img3})` }}>
                                    </div>
                                }
                                <div className="entry-container clear">
                                    <header className="entry-header">
                                        <h2 className="entry-title">
                                            <a href="#" tabindex="0">The Secrets We Carry Within Us</a></h2>
                                    </header>
                                    <div className="entry-meta">
                                        {
                                            param.showAuthor &&
                                            <span className="post-author"><i className="fas fa-user"></i> Admin</span>
                                        }
                                        {
                                            param.showDate &&
                                            <span className="post-date"><i className="fas fa-calendar"></i> Aug 01 2024</span>
                                        }


                                    </div>
                                    <div className="entry-content">
                                        {
                                            param.showExcert &&
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                <a href="#" className="more-link">Read More</a>
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div className="grid-item-wrapper clear">
                                {
                                    param.showThumbnail &&
                                    <div className="featured-image" style={{ backgroundImage: `url(${img3})` }}>
                                    </div>
                                }
                                <div className="entry-container clear">
                                    <header className="entry-header">
                                        <h2 className="entry-title">
                                            <a href="#" tabindex="0">Echoes of Time in a Fragile World</a></h2>
                                    </header>
                                    <div className="entry-meta">
                                        {
                                            param.showAuthor &&
                                            <span className="post-author"><i className="fas fa-user"></i> Admin</span>
                                        }
                                        {
                                            param.showDate &&
                                            <span className="post-date"><i className="fas fa-calendar"></i> Aug 01 2024</span>
                                        }


                                    </div>
                                    <div className="entry-content">
                                        {
                                            param.showExcert &&
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                <a href="#" className="more-link">Read More</a>
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article>
                            <div className="grid-item-wrapper clear">
                                {
                                    param.showThumbnail &&
                                    <div className="featured-image" style={{ backgroundImage: `url(${img1})` }}>
                                    </div>
                                }
                                <div className="entry-container clear">
                                    <header className="entry-header">
                                        <h2 className="entry-title">
                                            <a href="#" tabindex="0">Whispers of the Heart's Hidden Truths</a></h2>
                                    </header>
                                    <div className="entry-meta">
                                        {
                                            param.showAuthor &&
                                            <span className="post-author"><i className="fas fa-user"></i> Admin</span>
                                        }
                                        {
                                            param.showDate &&
                                            <span className="post-date"><i className="fas fa-calendar"></i> Aug 01 2024</span>
                                        }


                                    </div>
                                    <div className="entry-content">
                                        {
                                            param.showExcert &&
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                <a href="#" className="more-link">Read More</a>
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            }
        </div>
    );
};

export default GridDesignOne;