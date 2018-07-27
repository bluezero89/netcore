import React from 'react';
import { DEFAULT_BROKEN_IMAGE } from '../constants';
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount,

    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,

    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    MailruIcon,
    EmailIcon,
    LivejournalIcon,
    ViberIcon,
} from 'react-share';

export class SocialNetworkShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socialNetworkSetting: {
                 EnableFacebookShare:true,
                 EnableTwitterShare:true,
                 EnableTelegramShare:true,
                 EnableGooglePlusShare:true,
                 EnableWhatsappShare:true,
                 EnableLinkedInShare:true,
                 EnablePinterestShare:true,
                 EnableVKShare:true,
                 EnableOdnoklassnikiShare:false,
                 EnableRedditShare:false,
                 EnableTumblrShare:false,
                 EnableMailRuShare:true,
                 EnableLiveJournalShare:true,
                 EnableViberShare:true,
                 EnableEmailShare:true,
        
                 EnableSharedCounter:false
            }
        }
    }

    render() {
        const shareUrl = this.props.shareUrl ? this.props.shareUrl : `${String(window.location)}`;
        const title = this.props.title ? this.props.title : 'Webblog';
        const media = this.props.mediaFile ? this.props.mediaFile : undefined;
        return (

            <div>
                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableFacebookShare) {
                            return (
                                <div className="social-network-share">
                                    <FacebookShareButton
                                        url={this.state.socialNetworkSetting.FacebookShareUrl ? this.state.socialNetworkSetting.FacebookShareUrl : shareUrl}
                                        quote={title}
                                        className="social-network-share__share-button">
                                        <FacebookIcon
                                            size={32}
                                            round />
                                    </FacebookShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <FacebookShareCount
                                                url={this.state.socialNetworkSetting.FacebookShareUrl ? this.state.socialNetworkSetting.FacebookShareUrl : shareUrl}
                                                className="social-network-share__share-count">
                                                {count => count}
                                            </FacebookShareCount>
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableTwitterShare) {
                            return (
                                <div className="social-network-share">
                                    <TwitterShareButton
                                        url={this.state.socialNetworkSetting.TwitterShareUrl ? this.state.socialNetworkSetting.TwitterShareUrl : shareUrl}
                                        title={title}
                                        className="social-network-share__share-button">
                                        <TwitterIcon
                                            size={32}
                                            round />
                                    </TwitterShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <div className="social-network-share__share-count">
                                                &nbsp;
                                                    </div>
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableTelegramShare) {
                            return (
                                <div className="social-network-share">
                                    <TelegramShareButton
                                        url={this.state.socialNetworkSetting.TelegramShareUrl ? this.state.socialNetworkSetting.TelegramShareUrl : shareUrl}
                                        title={title}
                                        className="social-network-share__share-button">
                                        <TelegramIcon
                                            size={32}
                                            round />
                                    </TelegramShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <div className="social-network-share__share-count">
                                                &nbsp;
                                    </div> : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableWhatsappShare) {
                            return (
                                <div className="social-network-share">
                                    <WhatsappShareButton
                                        url={this.state.socialNetworkSetting.WhatsappShareUrl ? this.state.socialNetworkSetting.WhatsappShareUrl : shareUrl}
                                        title={title}
                                        separator=":: "
                                        className="social-network-share__share-button">
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <div className="social-network-share__share-count">
                                                &nbsp;
                                                    </div>
                                            : ''
                                    }

                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableGooglePlusShare) {
                            return (
                                <div className="social-network-share">
                                    <GooglePlusShareButton
                                        url={this.state.socialNetworkSetting.GooglePlusUrl ? this.state.socialNetworkSetting.GooglePlusShareUrl : shareUrl}
                                        className="social-network-share__share-button">
                                        <GooglePlusIcon
                                            size={32}
                                            round />
                                    </GooglePlusShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <GooglePlusShareCount
                                                url={this.state.socialNetworkSetting.GooglePlusUrl ? this.state.socialNetworkSetting.GooglePlusShareUrl : shareUrl}
                                                className="social-network-share__share-count">
                                                {count => count}
                                            </GooglePlusShareCount>
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableLinkedInShare) {
                            return (
                                <div className="social-network-share">
                                    <LinkedinShareButton
                                        url={this.state.socialNetworkSetting.LinkedInShareUrl ? this.state.socialNetworkSetting.LinkedInShareUrl : shareUrl}
                                        title={title}
                                        className="social-network-share__share-button">
                                        <LinkedinIcon
                                            size={32}
                                            round />
                                    </LinkedinShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <LinkedinShareCount
                                                url={this.state.socialNetworkSetting.LinkedInShareUrl ? this.state.socialNetworkSetting.LinkedInShareUrl : shareUrl}
                                                className="social-network-share__share-count">
                                                {count => count}
                                            </LinkedinShareCount>
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnablePinterestShare) {
                            return (
                                <div className="social-network-share">
                                    <PinterestShareButton
                                        url={this.state.socialNetworkSetting.PinterestShareUrl ? this.state.socialNetworkSetting.PinterestShareUrl : shareUrl}
                                        media={`${media ? media.mediaUrl : DEFAULT_BROKEN_IMAGE}`}
                                        className="social-network-share__share-button">
                                        <PinterestIcon size={32} round />
                                    </PinterestShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <PinterestShareCount url={this.state.socialNetworkSetting.PinterestShareUrl ? this.state.socialNetworkSetting.PinterestShareUrl : shareUrl}
                                                className="social-network-share__share-count" />
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableVKShare) {
                            return (
                                <div className="social-network-share">
                                    <VKShareButton
                                        url={this.state.socialNetworkSetting.VKShareUrl ? this.state.socialNetworkSetting.VKShareUrl : shareUrl}
                                        image={`${media ? media.mediaUrl : DEFAULT_BROKEN_IMAGE}`}
                                        className="social-network-share__share-button">
                                        <VKIcon
                                            size={32}
                                            round />
                                    </VKShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <VKShareCount
                                                url={this.state.socialNetworkSetting.VKShareUrl ? this.state.socialNetworkSetting.VKShareUrl : shareUrl}
                                                className="social-network-share__share-count" />
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableOdnoklassnikiShare) {
                            return (
                                <div className="social-network-share">
                                    <OKShareButton
                                        url={this.state.socialNetworkSetting.OdnoklassnikiShareUrl ? this.state.socialNetworkSetting.OdnoklassnikiShareUrl : shareUrl}
                                        image={`${media ? media.mediaUrl : DEFAULT_BROKEN_IMAGE}`}
                                        className="social-network-share__share-button">
                                        <OKIcon
                                            size={32}
                                            round />
                                    </OKShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter)
                                            ?
                                            <OKShareCount
                                                url={this.state.socialNetworkSetting.OdnoklassnikiShareUrl ? this.state.socialNetworkSetting.OdnoklassnikiShareUrl : shareUrl}
                                                className="social-network-share__share-count" />
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableRedditShare) {
                            return (
                                <div className="social-network-share">
                                    <RedditShareButton
                                        url={this.state.socialNetworkSetting.RedditShareUrl ? this.state.socialNetworkSetting.RedditShareUrl : shareUrl}
                                        title={title}
                                        className="social-network-share__share-button">
                                        <RedditIcon
                                            size={32}
                                            round />
                                    </RedditShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter) ?
                                            <RedditShareCount
                                                url={this.state.socialNetworkSetting.RedditShareUrl ? this.state.socialNetworkSetting.RedditShareUrl : shareUrl}
                                                className="social-network-share__share-count" />
                                            : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableTumblrShare) {
                            return (
                                <div className="social-network-share">
                                    <TumblrShareButton
                                        url={this.state.socialNetworkSetting.TumblrShareUrl ? this.state.socialNetworkSetting.TumblrShareUrl : shareUrl}
                                        title={title}
                                        className="social-network-share__share-button">
                                        <TumblrIcon
                                            size={32}
                                            round />
                                    </TumblrShareButton>
                                    {
                                        (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableSharedCounter)
                                            ?
                                            <TumblrShareCount
                                                url={this.state.socialNetworkSetting.TumblrShareUrl ? this.state.socialNetworkSetting.TumblrShareUrl : shareUrl}
                                                className="social-network-share__share-count" /> : ''
                                    }
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableLiveJournalShare) {
                            return (
                                <div className="social-network-share">
                                    <LivejournalShareButton
                                        url={this.state.socialNetworkSetting.LiveJournalShareUrl ? this.state.socialNetworkSetting.LiveJournalShareUrl : shareUrl}
                                        title={title}
                                        description={shareUrl}
                                        className="social-network-share__share-button"
                                    >
                                        <LivejournalIcon size={32} round />
                                    </LivejournalShareButton>
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableMailRuShare) {
                            return (
                                <div className="social-network-share">
                                    <MailruShareButton
                                        url={this.state.socialNetworkSetting.MailRuShareUrl ? this.state.socialNetworkSetting.MailRuShareUrl : shareUrl}
                                        title={title}
                                        className="social-network-share__share-button">
                                        <MailruIcon
                                            size={32}
                                            round />
                                    </MailruShareButton>
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableEmailShare) {
                            return (
                                <div className="social-network-share">
                                    <EmailShareButton
                                        url={this.state.socialNetworkSetting.EmailShareUrl ? this.state.socialNetworkSetting.EmailShareUrl : shareUrl}
                                        subject={title}
                                        body="body"
                                        className="social-network-share__share-button">
                                        <EmailIcon
                                            size={32}
                                            round />
                                    </EmailShareButton>
                                </div>
                            )
                        }
                    })()
                }

                {
                    (() => {
                        if (this.state.socialNetworkSetting && this.state.socialNetworkSetting.EnableViberShare) {
                            return (
                                <div className="social-network-share">
                                    <ViberShareButton
                                        url={this.state.socialNetworkSetting.ViberShareUrl ? this.state.socialNetworkSetting.ViberShareUrl : shareUrl}
                                        title={title}
                                        body="body"
                                        className="social-network-share__share-button">
                                        <ViberIcon
                                            size={32}
                                            round />
                                    </ViberShareButton>
                                </div>
                            )
                        }
                    })()
                }
            </div>
        )
    }
}