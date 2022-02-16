//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import Lsi from "./user-lsi"
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "UserDetail",
    nestingLevel: "bigBoxCollection",
    //@@viewOff:statics
};

export const UserDetail = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {

        userId: UU5.PropTypes.string,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const userData = useDataObject({
            handlerMap: {
                load: Calls.User.get,
            },
            initialDtoIn: {
                id: props.userId || props.params.id,
            },
        });
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const className = Config.Css.css``;
        const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
        const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

        function getResult() {
            let result;

            if (userData.state.includes("pending")) {
                result = <UU5.Bricks.Loading />;
            } else if (userData.state.includes("error")) {
                result = <UU5.Common.Error errorData={userData.errorData} />;
            } else {
                if (currentNestingLevel) {
                    result = (
                        <UU5.Bricks.Block colorScheme="blue" size="l" card={"content"}>
                            <b> <UU5.Bricks.Lsi lsi={Lsi.uuIdentity} /> </b> : {userData.data.uuIdentity}
                            <br />
                            <b> <UU5.Bricks.Lsi lsi={Lsi.role} /> </b> : {userData.data.role}

                        </UU5.Bricks.Block>

                    );
                } else {
                    result = (
                        <UU5.Bricks.Link
                            onClick={() => UU5.Environment.getRouter().setRoute("userDetail", { id: props.userId })}
                        >
                            {userData.data.name}
                        </UU5.Bricks.Link>
                    );
                }
            }
            return result;
        }

        return getResult();
        //@@viewOff:render
    },
});

export default UserDetail;
