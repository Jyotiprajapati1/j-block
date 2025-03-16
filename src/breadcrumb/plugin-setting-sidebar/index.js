/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
 import { registerPlugin } from '@wordpress/plugins';
 import { cog as icon } from '@wordpress/icons';
 import { PanelBody, Button, Spinner } from '@wordpress/components';
 import { useState } from '@wordpress/element';
 import apiFetch from '@wordpress/api-fetch';
 
 /**
  * Inner dependencies.
  */
 import './store/index.js';
 import TemplatesModel from './template-model';
 
 const Component = () => {
	 const [ { isTemplatesOpen, resetting }, setState ] = useState( {
		 isTemplatesOpen: false,
		 resetting:false
	 } );
	 const openModal = () =>
		 setState( {
			 isTemplatesOpen: true,
		 } );
	 const closeModal = () =>
		 setState( {
			 isTemplatesOpen: false,
		 } );
	 return (
		 <>
			 <PluginSidebarMoreMenuItem target="wp-travel-templates-library">
				 { __( 'WP Travel Templates', 'wp-travel-blocks' ) }
			 </PluginSidebarMoreMenuItem>
			 <PluginSidebar
				 name="wp-travel-templates-library"
				 title={ __( 'WP Travel Templates', 'wp-travel-blocks' ) }
				
			 >
				 <PanelBody>
					 <Button onClick={ () => openModal() } icon="admin-appearance" isSecondary>{ __( 'Browse Templates', 'wp-travel-blocks' ) }</Button>
					 { isTemplatesOpen && <TemplatesModel
						 onRequestClose={ () => closeModal() }
					 /> }
				 </PanelBody>
			 </PluginSidebar>
		 </>
	 );
 };
 
 registerPlugin( 'wp-travel-templates', {
	 render: Component,
 } );
 