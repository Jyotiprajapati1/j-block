import img1 from "./../../images/one.jpg";
import img2 from "./../../images/two.jpg";
import img3 from "./../../images/three.jpg";

const listDesignOne = ({attributes}) => {
  const param = attributes;
  
  return (
    <div className="list-one experimental-block-post-list-tab-content-wrapper">
        <div className="experimental-block-post-list-tab-content active" data-tab="uncategorized">
            <article>
                <div className="list-item-wrapper clear">
                    {
                        param.showThumbnail && 
                        <div className="featured-image" style={{ backgroundImage: `url(${img1})` }}>
                        </div>
                    }
                    <div 
                        className="entry-container clear" 
                        style={{ width: param.showThumbnail ? '50%' : '100%' }} // Correctly formatted ternary
                    >
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
                <div className="list-item-wrapper clear">
                    {
                        param.showThumbnail && 
                        <div className="featured-image" style={{ backgroundImage: `url(${img2})` }}>
                        </div>
                    }
                    <div 
                        className="entry-container clear" 
                        style={{ width: param.showThumbnail ? '50%' : '100%' }}
                    >
                        <header className="entry-header">
                            <h2 className="entry-title">
                                <a href="#" tabindex="0">Dancing Through Shadows</a></h2>
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

  );
};

export default listDesignOne;