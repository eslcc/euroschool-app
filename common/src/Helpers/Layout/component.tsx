import * as React from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { connect } from 'react-redux';

import { actions, Screen } from './state';

interface Props {
    layoutChange: (screen: Screen) => void;
}

class OrientationHelper extends React.Component<Props, {}> {
    onLayout = (event: LayoutChangeEvent) => {
        this.props.layoutChange(event.nativeEvent.layout);
    }

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this.onLayout}>
                {this.props.children}
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    layoutChange: (screen: Screen) => dispatch(actions.layoutChange(screen)),
});

export default connect(null, mapDispatchToProps)(OrientationHelper);
