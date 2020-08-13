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

import React, { PureComponent, ComponentType, ReactNode } from "react"
import hoistNonReactStatics from "hoist-non-react-statics"
import { Map as ImmutableMap } from "immutable"

import SectionWrapper from "components/shared/SectionWrapper"

export interface ReportElementProps {
  element: ImmutableMap<string, any>
  index?: number
}

function withSectionWrapper(
  WrappedComponent: ComponentType<any>
): ComponentType<any> {
  class ComponentWithSectionWrapper extends PureComponent<ReportElementProps> {
    static readonly displayName = `withSectionWrapper(${WrappedComponent.displayName ||
      WrappedComponent.name})`

    render(): ReactNode {
      const { ...passThroughProps } = this.props
      return (
        <SectionWrapper>
          {({ collapsed }) => <WrappedComponent {...passThroughProps} />}
        </SectionWrapper>
      )
    }
  }

  // Static methods must be copied over
  // https://en.reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  return hoistNonReactStatics(ComponentWithSectionWrapper, WrappedComponent)
}

export default withSectionWrapper
