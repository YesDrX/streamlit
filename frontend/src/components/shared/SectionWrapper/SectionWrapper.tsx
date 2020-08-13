/**
 * @license
 * Copyright 2018-2020 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { PureComponent } from "react"
import "./SectionWrapper.scss"

export type Size = {
  collapsed: boolean
}

interface State {
  collapsed: boolean
}

interface Props {
  children: (props: Size) => React.ReactNode
}

class SectionWrapper extends PureComponent<Props, State> {
  static isCollapsed = false
  public state: State = { collapsed: false }

  clapseButtonClicked = (): void => {
    if (SectionWrapper.isCollapsed) {
      SectionWrapper.isCollapsed = false
      this.setState({ collapsed: false })
    } else {
      SectionWrapper.isCollapsed = true
      this.setState({ collapsed: true })
    }
  }

  public render(): JSX.Element {
    const { collapsed } = this.state
    const { children } = this.props

    let buttonClassName = "button-to-hide"
    let buttonOnClick = this.clapseButtonClicked
    let buttonTitle = "Click to hide section"
    let display = "block"
    if (collapsed) {
      buttonClassName = "button-to-show"
      buttonTitle = "Click to show section"
      display = "none"
    }

    return (
      <div className={`sectionFrame${collapsed ? "--collapsed" : ""}`}>
        <button
          className={buttonClassName}
          onClick={buttonOnClick}
          title={buttonTitle}
        >
          {buttonTitle}
        </button>
        <div className="sectionContent" style={{ display: display }}>
          {children({ collapsed })}
        </div>
      </div>
    )
  }
}

export default SectionWrapper
