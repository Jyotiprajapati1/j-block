import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    PanelColorSettings,
    BlockControls
} from "@wordpress/block-editor";

import { useEffect, useRef, Fragment } from "@wordpress/element";
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    RangeControl
} from "@wordpress/components";

import './editor.scss';

import GridDesignOne from './layout/grid/GridDesignOne';
import GridDesignTwo from './layout/grid/GridDesignTwo';
import GridDesignThree from './layout/grid/GridDesignThree';
import GridDesignFour from './layout/grid/GridDesignFour';
import ListDesignOne from './layout/list/ListDesignOne';
import ListDesignTwo from './layout/list/ListDesignTwo';
import ListDesignThree from './layout/list/ListDesignThree';
import ListDesignFour from './layout/list/ListDesignFour';

// Create a mapping of possible components
const componentMap = {
    ListDesignOne,
    ListDesignTwo,
    ListDesignThree,
    ListDesignFour,
    GridDesignOne,
    GridDesignTwo,
    GridDesignThree,
    GridDesignFour
};

export default function Edit(props) {
    const { setAttributes, attributes } = props;
    const { showAuthor, showDate, blockId, postCount, contentType, postIds, categoryIds, tagIds, showThumbnail, design, layout, showLoadMore, postByCategory, postByTags, showExcert, gridColumn } = attributes;


    const strRandom = () => {
        var result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var length = 10;

        // Loop to generate characters for the specified length
        for (let i = 0; i < length; i++) {
            const randomInd = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomInd);
        }
        return result;
    }

    if (!blockId) {
        setAttributes({ blockId: strRandom() });
    }

    const toCapitalCase = (str) => {
        return str
            .toLowerCase() // Convert the entire string to lowercase first
            .split(' ')    // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' ');    // Join the words back into a single string
    }

    // Create the dynamic component name
    const componentName = `${toCapitalCase(layout)}Design${toCapitalCase(design)}`;
    const ComponentToRender = componentMap[componentName]; // Get the component from the map

    return (
        <div {...useBlockProps()}>
            <Fragment>
                <BlockControls />
                <InspectorControls key="setting">
                    <PanelBody title={__('Content Setting', 'experimental-block')} initialOpen={false}>
                        <SelectControl
                            label={__('Content Type', 'experimental-block')}
                            value={contentType}
                            options={[
                                {
                                    label: __('Post Ids', 'experimental-block'),
                                    value: 'postIds'
                                }, {
                                    label: __('Category Ids', 'experimental-block'),
                                    value: 'catIds'
                                }, {
                                    label: __('Tags Ids', 'experimental-block'),
                                    value: 'tagIds'
                                }, {
                                    label: __('Recent Posts', 'experimental-block'),
                                    value: 'recentPost'
                                },
                                , {
                                    label: __('Related Posts', 'experimental-block'),
                                    value: 'relatedPost'
                                }
                            ]}
                            onChange={(val) => setAttributes({ contentType: val })}
                        />
                        {contentType === 'postIds' && (
                            <TextControl
                                label={__('Post Ids', 'experimental-block')}
                                value={postIds}
                                onChange={value => setAttributes({ postIds: value })}
                            />
                        )}
                        {contentType === 'catIds' && (
                            <TextControl
                                label={__('Category Ids', 'experimental-block')}
                                value={categoryIds}
                                onChange={value => setAttributes({ categoryIds: value })}
                            />
                        )}
                        {contentType === 'tagIds' && (
                            <TextControl
                                label={__('Tag Ids', 'experimental-block')}
                                value={tagIds}
                                onChange={value => setAttributes({ tagIds: value })}
                            />
                        )}
                        {contentType === 'relatedPost' && ([
                            <ToggleControl
                                label={__("Show posts by category", "experimental-block")}
                                checked={postByCategory}
                                onChange={(ispostByCategory) => setAttributes({ postByCategory: ispostByCategory })}
                            />,
                            <ToggleControl
                                label={__("Show posts by Tags", "experimental-block")}
                                checked={postByTags}
                                onChange={(ispostByCategory) => setAttributes({ postByTags: ispostByCategory })}
                            />])
                        }

                        {contentType !== 'postIds' && (
                            <RangeControl
                                label={__('Post Count', 'experimental-block')}
                                onChange={(value) => setAttributes({ postCount: value })}
                                shiftStep={1}
                                min={1}
                                max={20}
                                value={postCount}
                            />
                        )}

                        {layout === 'grid' && (
                            <RangeControl
                                label={__('Grid Column', 'experimental-block')}
                                onChange={(value) => setAttributes({ gridColumn: Number(value) })}
                                shiftStep={1}
                                min={1}
                                max={4}
                                value={gridColumn || 3}
                            />
                        )}

                        <ToggleControl
                            label={__('Show Thumbnail', 'experimental-block')}
                            checked={showThumbnail}
                            onChange={() => setAttributes({ showThumbnail: !showThumbnail })}
                        />

                        <ToggleControl
                            label={__('Show Post Author', 'experimental-block')}
                            checked={showAuthor}
                            onChange={() => setAttributes({ showAuthor: !showAuthor })}
                        />

                        <ToggleControl
                            label={__('Show Posted Date', 'experimental-block')}
                            checked={showDate}
                            onChange={() => setAttributes({ showDate: !showDate })}
                        />
                        <ToggleControl
                            label={__('Show Excert', 'experimental-block')}
                            checked={showExcert}
                            onChange={() => setAttributes({ showExcert: !showExcert })}
                        />
                        {contentType == 'recentPost' || 'relatedPost' && (
                            <ToggleControl
                                label={__('Show Load More', 'experimental-block')}
                                checked={showLoadMore}
                                onChange={() => setAttributes({ showLoadMore: !showLoadMore })}
                            />
                        )}
                        <SelectControl
                            label={__('Select Layout', 'experimental-block')}
                            value={layout}
                            options={[
                                { label: __('List', 'experimental-block'), value: 'list' },
                                { label: __('Grid', 'experimental-block'), value: 'grid' }
                            ]}
                            onChange={(val) => setAttributes({ layout: val })}
                        />
                        <SelectControl
                            label={__('Select Design', 'experimental-block')}
                            value={design}
                            options={[
                                { label: __('Design One', 'experimental-block'), value: 'one' },
                                { label: __('Design Two', 'experimental-block'), value: 'two' },
                                { label: __('Design Three', 'experimental-block'), value: 'three' },
                                { label: __('Design Four', 'experimental-block'), value: 'four' }
                            ]}
                            onChange={(val) => setAttributes({ design: val })}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
            <div id={`post-list-${blockId}`}>
                {ComponentToRender ? (
                    <ComponentToRender attributes={attributes} />
                ) : (
                    <div>Component not found</div>
                )}
            </div>
        </div>
    );
}
