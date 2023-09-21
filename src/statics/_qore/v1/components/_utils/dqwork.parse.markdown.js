import { LitElement, css, html } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafeHtml'
import cubeSheet from '/styles/_namespace/dq/work/cube.css' assert { type: 'css' }
import headerSheet from '/styles/atoms/dq/work/header.css' assert { type: 'css' }
import classlessSheet from '/styles/_particles/_base/downquark-classless.css' assert { type: 'css' }

const _BASE_MD_DIRECTORY_PATH = '/assets/_content/_downquark/',
      DEFAULT_LOADING_TEXT_MD = 'Loading...'

/**
 * By default this will parse the url to define the `.md` file to load.
 * There are two overloads that can be applied to change this behavior
 * > NOTE: I realize the SEO implications of the current routing solution
 * > - but this will be replaced with URI Rewriting shortly
 * 
 * 1. add the content inline
 * ```
 * <dq_work-util-parse-markdown
 *   with-class="[ dq-work cube > block ] [ post ]"
 * >`Inline`</dq_work-util-parse-markdown>
 * ```
 * 
 * 2. add a custom path
 * > NOTE: any specified file's root is `/assets/_content/_downquark/_internals/`
 * > - the following will read from `/assets/_content/_downquark/_internals/nested/folder/repeated-content.md`
 * ```
 * <dq_work-util-parse-markdown
 *   md="nested_folder_repeated-content"
 *   with-class="[ dq-work cube > block ] [ post ]"
 * >Loading...</dq_work-util-parse-markdown>
 * ```
 * 
 * > NOTE: to use multiple components on a page they will need to be wrapped
 * > in their own `divs`
 * ```
 * <div><dq_work-util-parse-markdown md="1.md" /></div>
 * <div><dq_work-util-parse-markdown md="2.md" /></div>
 * ```
 */

class DqWorkUtilParseMarkdown extends LitElement {
  static styles = [
    classlessSheet,
    headerSheet,
    cubeSheet,
    css`:is(h2,h3,h4,h5,h6){text-align: end;}`
  ]

  static properties = {
    _markdownMetadata: {state: false},
    _convertedMarkdown: {state: true},
    _slottedText: {state: false},
    markdown: {attribute: 'md', type:String},
    wrapperclass: {attribute: 'with-class', type:String},
  }

  constructor() {
    super()
    this._convertedMarkdown = ''
    this._slottedText = ''
    this.markdown = ''
    this._markdownMetadata = {}
    this.wrapperclass = ''
  }

  loadShowdown(){
    if(
      document.querySelector('data-markdownparser')
      || typeof showdown !== 'undefined'
    ){ return } // sanity

    const scriptEle = document.createElement("script")
    scriptEle.setAttribute("data-markdownparser", "showdown")
    scriptEle.setAttribute("src", "/scripts/vendor/showdown-2.1.0.min.js")
      // original at: https://cdnjs.cloudflare.com/ajax/libs/showdown/2.1.0/showdown.min.js
    document.body.appendChild(scriptEle)
  }
  async loadMarkdown(that) {
    if (typeof showdown === 'undefined') {
      setTimeout(() => this.loadMarkdown(that),100)
      return
    }
    /**
     * This is a short term hacky fix:
     */
    const applyConvertedMarkdown = () => {
      const mdComponent = this.parentElement.querySelector('dq_work-util-parse-markdown')
                            .shadowRoot.querySelector('.apply-unsafe-html')
      mdComponent.innerHTML = that._convertedMarkdown
    }

    const convertOpts = {
        omitExtraWLInCodeBlocks:true,
        strikethrough:true,
        tables:true,
        tasklists:true,
        disableForced4SpacesIndentedSublists:true,
        simpleLineBreaks:true,
        requireSpaceBeforeHeadingText:true,
        metadata:true,
      },
      converter = new showdown.Converter(convertOpts),
      md = this.markdown
        ? await (
            await 
              fetch(this.markdown)
                .then(resp => {
                  if(resp.status > 400) window.location.href='/error.html'
                  return resp
                })
                .catch(err => window.location.href='/error.html')
          ).text()
        : this._slottedText,
      convertedMd = converter.makeHtml(md)
    that._markdownMetadata = converter.getMetadata()
    that._convertedMarkdown = convertedMd
    applyConvertedMarkdown()
  }

  handleSlotchange(e){
    if(this._convertedMarkdown.length) return // individual content will be static, no need to re-parse on slot change
    const setMdFile = () => {
      if(this.markdown.length){ // user specified project takes priority
        // nested should never reference anything that could be defined by a url
        this.markdown = _BASE_MD_DIRECTORY_PATH+'_internals/'+this.markdown+'.md'
        return
      }
      const childNodes = e.target.assignedNodes({flatten: true}),
            curSlottedText = childNodes.map((node) => node.textContent ? node.textContent : '').join('')
      if(curSlottedText?.length && curSlottedText !== DEFAULT_LOADING_TEXT_MD){ // only set when not the default text
        this._slottedText = curSlottedText
        return
      } 
      if(window.location.search) { // if on an "internal" page
        // TODO: for phase 2 adjust the url rewrite rules and replace the search with a "real" url path
        let mdFile = window.location.search.replace('?','').split('_')
            mdFile = mdFile.length > 1 ? mdFile.join('/').replace(/(.)$/,'$1.md') : '_'+mdFile+'.md'
        this.markdown = _BASE_MD_DIRECTORY_PATH+mdFile
        return
      }
      this.markdown = _BASE_MD_DIRECTORY_PATH+'_landing.md' // default to landing page
    }
    setMdFile()
    this.loadMarkdown(this)
  }

  connectedCallback() {
    super.connectedCallback()
    if(!document.querySelector('data-markdownparser'))
      this.loadShowdown()
  }
  
  render() {
    // console.log('this._: ', this._markdownMetadata) // reference

    return html`
    <div class="${this.wrapperclass}[ apply-unsafe-html ]">
      <slot @slotchange=${this.handleSlotchange} class="[ dq-work ][ util > inline-md ]"></slot>
      <!-- there is an issue when initializing current directives -->
      <!-- using a direct DOM mutation for now until the issue is resolved and -->
      <!-- the below directive works again -->
      <!-- ${unsafeHTML(this._convertedMarkdown)} -->
    </div>
    `
  }
}

customElements.define('dq_work-util-parse-markdown', DqWorkUtilParseMarkdown)