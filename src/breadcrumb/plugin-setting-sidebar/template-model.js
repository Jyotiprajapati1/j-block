/**
 * WordPress dependencies
 */
 import { __, sprintf } from '@wordpress/i18n';
 import { useEffect, useState, Component, Fragment, RawHTML } from '@wordpress/element';
 import { compose } from '@wordpress/compose';
 import { Modal, Spinner, TabPanel, SelectControl, Tooltip, ExternalLink } from '@wordpress/components';
 import { withDispatch, withSelect } from '@wordpress/data';
 import { parse } from '@wordpress/blocks';
 import apiFetch from '@wordpress/api-fetch';
 
 /**
  * External dependencies.
  */
 import classnames from 'classnames';
 import Masonry from "react-responsive-masonry"
 import LazyLoad from 'react-lazyload';
 
 class TemplatesModal extends Component {
	
     constructor( props ) {
         super( props );
 
         this.state = {
             loading: false,
             activeCategory: {},
             error: false,
         };
 
         this.getSelectedCategory = this.getSelectedCategory.bind( this );
         this.printCategorySelect = this.printCategorySelect.bind( this );
         this.getTemplates = this.getTemplates.bind( this );			
		 
     }

	 

 
     getSelectedCategory( type ) {
         return this.state.activeCategory[ type ] || false;
     }
 
     getTemplates( type, categorySelected = null ) {
         const { templates = false } = this.props;
 
         if ( ! templates ) {
             return templates;
         }
 
         const result = [];
 
         categorySelected =
 null === categorySelected ? this.getSelectedCategory( type ) : '';
 
         templates.forEach( ( template ) => {
             let allow = ! type;
 
             // type check.
             if ( ! allow && template.types ) {
                 template.types.forEach( ( typeData ) => {
                     if ( typeData.slug && type === typeData.slug ) {
                         allow = true;
                     }
                 } );
             }
 
             // category check.
             if ( allow && categorySelected && template.categories ) {
                 let categoryAllow = false;
                 template.categories.forEach( ( catData ) => {
                     if ( catData.slug && categorySelected === catData.slug ) {
                         categoryAllow = true;
                     }
                 } );
                 allow = categoryAllow;
             }
 
             if ( allow ) {
                 result.push( template );
             }
         } );
 
         return result;
     }
 
     printCategorySelect( type ) {
         const templates = this.getTemplates( type, '' );
         const categories = {};
         const selectData = [];
 
         templates.forEach( ( template ) => {
             if ( template.categories && template.categories.length ) {
                 template.categories.forEach( ( catData ) => {
                     if ( ! categories[ catData.slug ] ) {
                         categories[ catData.slug ] = true;
                         selectData.push( {
                             value: catData.slug,
                             label: catData.name,
                         } );
                     }
                 } );
             }
         } );
 
         if ( selectData.length ) {
             selectData.unshift( {
                 value: '',
                 label: __( '-- Select Category --', 'wp-travel-blocks' ),
             } );
             return (
                 <SelectControl
                     value={ this.getSelectedCategory( type ) }
                     options={ selectData }
                     onChange={ ( value ) => {
                         this.setState( ( prevState ) => ( {
                             activeCategory: {
                                 ...prevState.activeCategory,
                                 ...{
                                     [ type ]: value,
                                 },
                             },
                         } ) );
                     } }
                 />
             );
         }
 
         return null;
     }
	 
 
     render() {
         const { checkPro, insertTemplate, getTemplateData, onRequestClose } = this.props;
 
         const allTemplates = this.getTemplates();
         const themeTemplates = this.getTemplates( 'theme' );
         const showLoadingSpinner =
 this.state.loading || ! allTemplates || ! allTemplates.length;

		
         return (
             <Modal
                 className="wp-travel-gutenberg-blocks-library"
                 position="top"
                 size="lg"
                 onRequestClose={ () => {
                     onRequestClose();
                 } }
                 shouldCloseOnClickOutside={ false }
                 // icon={ getIcon( 'plugin-templates' ) }
                 __experimentalHideHeader={ true }
             >
                 <div className="components-modal__header">
                     <div className="components-modal__header-heading-container">
                         <h1
                             id="components-modal-header-1"
                             className="components-modal__header-heading"
                         >
                             { __( 'Templates', 'wp-travel-blocks' ) }
                         </h1>
						 { showLoadingSpinner ? (
							<div className="wp-travel-gutenberg-blocks-modal-loading-spinner">
								<Spinner />
							</div>
						) : (
							''
						) }
                     </div>
                     
                     <button
                         type="button"
                         aria-label="Close dialog"
                         className="components-button components-icon-button"
                         onClick={ () => {
                             onRequestClose();
                         } }
                     >
                         <svg
                             aria-hidden="true"
                             role="img"
                             focusable="false"
                             className="dashicon dashicons-no-alt"
                             xmlns="http://www.w3.org/2000/svg"
                             width="20"
                             height="20"
                             viewBox="0 0 20 20"
                         >
                             <path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z" />
                         </svg>
                     </button>
                 </div>
				

				{ allTemplates && allTemplates.length ? (
					<TabPanel
						className="wp-travel-gutenberg-blocks-control-tabs wp-travel-gutenberg-blocks-component-modal-tab-panel"
						tabs={ [
							...( themeTemplates && themeTemplates.length
								? [
									{
										name: 'theme',
										title: (
											<Tooltip
												text={ __(
													'Templates from the theme.',
													'wp-travel-blocks'
												) }
											>
												<span>
													{ __( 'Theme', 'wp-travel-blocks' ) }
												</span>
											</Tooltip>
										),
										className: 'wp-travel-gutenberg-blocks-control-tabs-tab',
									},
								]
								: [] ),
							{
								name: 'blocks',
								title: (
									<Tooltip
										text={ __(
											'Simple blocks to construct your page.',
											'wp-travel-blocks'
										) }
									>
										<span>{ __( 'Blocks', 'wp-travel-blocks' ) }</span>
									</Tooltip>
								),
								className: 'wp-travel-gutenberg-blocks-control-tabs-tab',
							},
							{
								name: 'pages',
								title: (
									<Tooltip
										text={ __(
											'Pre-designed ready to use pages.',
											'wp-travel-blocks'
										) }
									>
										<span>{ __( 'Pages', 'wp-travel-blocks' ) }</span>
									</Tooltip>
								),
								className: 'wp-travel-gutenberg-blocks-control-tabs-tab',
							},
							// {
							// 	name: 'local',
							// 	title: (
							// 		<Tooltip text={ __( 'My Templates.', 'wp-travel-blocks' ) }>
							// 			<span>{ __( 'My Templates', 'wp-travel-blocks' ) }</span>
							// 		</Tooltip>
							// 	),
							// 	className: 'wp-travel-gutenberg-blocks-control-tabs-tab',
							// },
						] }
					>
						{ ( tabData ) => {
							const tabType = tabData.name;
							let currentTemplates = false;
							let selectedCategory = false;
							currentTemplates = this.getTemplates( tabType );
							selectedCategory = this.getSelectedCategory( tabType );

							// if ( 'pages' === tabType ) {
							// 	return __( 'Coming Soon...', 'wp-travel-blocks' );
							// }

							return (
								<Fragment>
									{ false === currentTemplates ? (
										<div className="wp-travel-gutenberg-blocks-spinner">
											<Spinner />
										</div>
									) : (
										''
									) }
									{ currentTemplates && ! currentTemplates.length ? (
										<div>
											{ 'local' === tabType ? (
												<Fragment>
													<p
														style={ {
															marginTop: 0,
														} }
													>
														{ __( 'No templates found.', 'wp-travel-blocks' ) }
													</p>
													{/* <ExternalLink
														className="components-button is-button is-primary"
														href={ '#' }
													>
														{ __( 'Add Template', 'wp-travel-blocks' ) }
													</ExternalLink> */}
												</Fragment>
											) : (
												__( 'No templates found.', 'wp-travel-blocks' )
											) }
										</div>
									) : (
										''
									) }
									{ currentTemplates && currentTemplates.length ? (
										<Fragment key={ `${ tabType }-${ selectedCategory }` }>
											<div className="wp-travel-gutenberg-blocks-categories-row">
												<div className="wp-travel-gutenberg-blocks-categories-select">
													{ this.printCategorySelect( tabType ) }
												</div>
												<div className="wp-travel-gutenberg-blocks-count">
													<RawHTML>
														{ sprintf(
															__( 'Templates: %s', 'wp-travel-blocks' ),
															`<strong>${ currentTemplates.length }</strong>`
														) }
													</RawHTML>
												</div>
											</div>
											{ this.state.error }
											<Masonry 
												columnsCount={3}
												gutter="10px"
												className="wp-travel-template-lists"
											>	
												{ currentTemplates.map( ( template, i ) => {
													const withThumb = !! template.thumbnail;
													let thumbAspectRatio = false;

													if (
														template.thumbnail_height &&
						template.thumbnail_width
													) {
														thumbAspectRatio =
							template.thumbnail_height /
							template.thumbnail_width;
													}
													
													return (
														<div
															key={ i }
															style={{width: "100%", display: "block"}}
														>
															{ /* eslint-disable-next-line react/button-has-type */ }														
															<img
																width= '100%'
																src={ template.thumbnail }
																alt={ template.title }
															/> 
															<div className="wp-travel-gutenberg-blocks-list-item-title">																	
																<>
																	<div className='template-name'>{template.title}</div>
																	<div className='import-icon'>
																		{ tabType == 'local' && 
																			<button 
																			onClick={ () => {
																				this.setState( {
																					loading: true,
																				} );
																				getTemplateData(
																					{
																					id: template.id,
																					type: tabType,
																					},
																					( data ) => {
																					if (
																						data &&
																					data.success &&
																					data.response &&
																					data.response.content
																					) {
																						insertTemplate(
																						data.response.content,
																						this.props.replaceBlockId,
																						( error ) => {
																							if ( error ) {
																							this.setState( { error } );
																							} else {
																							onRequestClose();
																							}
																						}
																						);
																					}
																					this.setState( {
																						loading: false,
																					} );
																					}
																				);
																				} }>
																				<i className="fas fa-download"></i>
																			</button>
																			||
																			<>
																			{	
																				Object.keys(template.is_pro_template).length !== 1 &&

																				<button 
																				onClick={ () => {
																					this.setState( {
																						loading: true,
																					} );
																					getTemplateData(
																						{
																						id: template.id,
																						type: tabType,
																						},
																						( data ) => {
																						if (
																							data &&
																						data.success &&
																						data.response &&
																						data.response.content
																						) {
																							insertTemplate(
																							data.response.content,
																							this.props.replaceBlockId,
																							( error ) => {
																								if ( error ) {
																								this.setState( { error } );
																								} else {
																								onRequestClose();
																								}
																							}
																							);
																						}
																						this.setState( {
																							loading: false,
																						} );
																						}
																					);
																					} }>
																					<i className="fas fa-download"></i>
																				</button>
																				||

																				<>
																					{
																						typeof checkPro.is_block_pro_enable != 'undefined' && checkPro.is_block_pro_enable == 'yes' && 
																						<>
																							<button 
																							onClick={ () => {
																								this.setState( {
																									loading: true,
																								} );
																								getTemplateData(
																									{
																									id: template.id,
																									type: tabType,
																									},
																									( data ) => {
																									if (
																										data &&
																									data.success &&
																									data.response &&
																									data.response.content
																									) {
																										insertTemplate(
																										data.response.content,
																										this.props.replaceBlockId,
																										( error ) => {
																											if ( error ) {
																											this.setState( { error } );
																											} else {
																											onRequestClose();
																											}
																										}
																										);
																									}
																									this.setState( {
																										loading: false,
																									} );
																									}
																								);
																								} }>
																								<i className="fas fa-download"></i>
																							</button>
																						</>
																						||
																						<span className='pro-tag'>pro</span>
																					}
																				</>
																				
																		    }
																			</>
																			
																		}
																	</div>
																</>
															</div>
														</div>
													);
												} ) }
											</Masonry >
											{/* { 'local' === tabType ? (
												<Fragment>
													<ExternalLink
														className="components-button is-button is-primary"
														href={ '#' }
													>
														{ __( 'Add Template', 'wp-travel-blocks' ) }
													</ExternalLink>
												</Fragment>
											) : (
												''
											) } */}
										</Fragment>
									) : (
										''
									) }
								</Fragment>
							);
						} }
					</TabPanel>
				) : (
					''
				) }

             </Modal>
         );
     }
 }
 
 const checkMissingBlocks = () => {
     return false;
 };
 
 export default compose( [
     withDispatch( ( dispatch ) => {
         const { insertBlocks, replaceBlocks } = dispatch( 'core/block-editor' );
 
         return {
             insertTemplate( content, replaceBlockId, cb ) {
                 const parsedBlocks = parse( content );
 
                 if ( parsedBlocks.length ) {
                     const missingBlocksData = checkMissingBlocks( parsedBlocks );
 
                     if ( missingBlocksData ) {
                         cb( missingBlocksData );
                     } else {
                         if ( replaceBlockId ) {
                             replaceBlocks( replaceBlockId, parsedBlocks );
                         } else {
                             insertBlocks( parsedBlocks );
                         }
                         cb( false );
                     }
                 }
             },
         };
     } ),
	 
     withSelect( ( select ) => {
		const [checkPro, setCheckPro] = useState([]);

		useEffect(
			() => {
				fetch( _wp_travel.site_url + '/wp-json/wp-travel-blocks/v1/check-for-block-pro', {
					method: "GET"
					}).then((res) => res.json())
					.then((data) => {
						setCheckPro( data )
					})
					.catch((err) => console.error(err));
		
			}, []
		)
		
		
			
         const templates = select( 'wp-travel-blocks/templates' ).getTemplates();
         return {
             templates,
			 checkPro,
             getTemplateData( data, cb ) {
                 let { type } = data;
                 if ( 'local' !== type && 'theme' !== type ) {
                     type = 'remote';
                 }
 
                 apiFetch( {
                     path: `/wp-travel-blocks/v1/get_template_data/?id=${ data.id }&type=${ type }`,
                     method: 'GET',
                 } )
                     .then( ( result ) => {
                         cb( result );
                     } )
                     .catch( ( error ) => {
                         cb( error );
                     } );
             },
         };
     } ),
 ] )( TemplatesModal );
 