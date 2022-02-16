//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject , useDataList, useState} from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config.js";
import Calls from "../calls.js";
import termLsi from "./term-lsi"
import assignmentLsi from "./assignment-lsi.js";

import AssignmentForm from "../bricks/assignment-form.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TermDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TermDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    termId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const termData = useDataObject({
      handlerMap: {
        load: Calls.Term.get,
      },
      initialDtoIn: {
        id: props.termId || props.params.id,
      },
    });

    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);

    const assignmentListData = useDataList({
      handlerMap: {
        load: Calls.Assignment.list,
        createItem: Calls.Assignment.create,
      },
      itemHandlerMap: {
        update: Calls.Assignment.update,
        delete: Calls.Assignment.delete,
      },
      initialDtoIn: {},
    });

    //@@viewOff:private

    //@@viewOn:interface
    
    function handleCreateAssignment(newAssignmentData) {
      return assignmentListData.handlerMap.createItem(newAssignmentData);
    }

    function handleUpdateAssignment(updatedSubjectData) {
      return selectedAssignment.handlerMap.update(updatedAssignmentData);
    }

    async function handleAssignmentDelete() {
      await assignmentToDelete.handlerMap.delete({ id: assignmentToDelete.data.id });
      setAssignmentToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;

      if (termData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (termData.state.includes("error")) {
        result = <UU5.Common.Error errorData={termData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue" card={"content"}>
              
             <b> <UU5.Bricks.Lsi lsi={termLsi.year}/> </b> : {termData.data.year}
              <br />
             <b> <UU5.Bricks.Lsi lsi={termLsi.season}/> </b> : {termData.data.season}
         
            </UU5.Bricks.Block>
          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("termDetail", { id: props.termId })}
            >
              {termData.data.name}
            </UU5.Bricks.Link>
          );
        }
      }
      return result;
    }

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={assignmentLsi.name} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.name,

        },

        {
          header: <UU5.Bricks.Lsi lsi={assignmentLsi.type} />,
          cell: (cellProps) => cellProps.data.data.type,
        },
        {
          header: <UU5.Bricks.Lsi lsi={assignmentLsi.deadline} />,
          cell: (cellProps) => cellProps.data.data.deadline,
        },


        {
          cell: (cellProps) => {
            if (cellProps.data.state.includes("pending")) {
              return <UU5.Bricks.Loading />
            } else {
              return (
                <>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => { UU5.Environment.getRouter().setRoute("assignmentDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedAssignment(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setAssignmentToDelete(cellProps.data)}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-close"
                    />
                  </UU5.Bricks.Button>
                </>
              );
            }
          },
        },
      ];
    }

    return currentNestingLevel ? (

      <div {...attrs}>

        {
          getResult()
        }
        <UU5.Bricks.Line />

        {
          selectedAssignment && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedAssignment?.id ? assignmentLsi.updateAssignment : assignmentLsi.createAssignment} />}
              shown={!!selectedAssignment}
              onClose={() => setSelectedAssignment(null)}
            >
              <AssignmentForm
                selectedAssignment={selectedAssignment.data}
                setSelectedAssignment={setSelectedAssignment}
                handleCreateAssignment={handleCreateAssignment}
                handleUpdateAssignment={handleUpdateAssignment}
              />
            </UU5.Bricks.Modal>
          )
        }

        {assignmentToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Assignment Deletion"}
            shown={true}
            onClose={() => setAssignmentToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setAssignmentToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleAssignmentDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedAssignment({ data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={assignmentLsi.create} />
        </UU5.Bricks.Button>

        <Uu5Tiles.List columns={getCollumns()} data={assignmentListData.data || []} rowAlignment="center" rowHeight={150} />

      </div>
    ) : null;

    //@@viewOff:render
  },
});

export default TermDetail;
