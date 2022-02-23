//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject, useState, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config.js";
import Calls from "../calls.js";
import assignmentLsi from "./assignment-lsi"
import gradeLsi from "./grade-lsi.js";
import UserDataList from "../bricks/user-data-list.js";
import GradeForm from "../bricks/grade-form"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AssignmentDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AssignmentDetail = UserDataList (
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    assignmentId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const assignmentData = useDataObject({
      handlerMap: {
        load: Calls.Assignment.get,
      },
      initialDtoIn: {
        id: props.assignmentId || props.params.id,
      },
    });
    
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gradeToDelete, setGradeToDelete] = useState(null);

    const gradeListData = useDataList({
      handlerMap: {
        load: Calls.Grade.list,
        createItem: Calls.Grade.create,
      },
      itemHandlerMap: {
        update: Calls.Grade.update,
        delete: Calls.Grade.delete,
      },
      initialDtoIn: {
        assignmentId: props.assignmentId || props.params.id,
      },
    });

    
    const userAvailableTags = [];
      if (props.data) {
        props.data.forEach((user) => {
          userAvailableTags.push({
            value: user.data.name,
            content: user.data.name,
          });
        });
      }
    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateGrade(newGradeData) {
      return gradeListData.handlerMap.createItem(newGradeData);
    }

    function handleUpdateGrade(updatedGradeData) {
      return selectedGrade.handlerMap.update(updatedGradeData);
    }

    async function handleGradeDelete() {
      await gradeToDelete.handlerMap.delete({ id: gradeToDelete.data.id });
      setGradeToDelete(null);
      window.location.reload();
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;

      if (assignmentData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (assignmentData.state.includes("error")) {
        result = <UU5.Common.Error errorData={assignmentData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue" card={"content"}>
            
            <b> <UU5.Bricks.Lsi lsi={assignmentLsi.name}/> </b> :   {assignmentData.data.name}
              <br />
             <b> <UU5.Bricks.Lsi lsi={assignmentLsi.type}/> </b> : {assignmentData.data.type}
              <br />
             <b> <UU5.Bricks.Lsi lsi={assignmentLsi.description}/> </b> : {assignmentData.data.description}
              <br />
             <b> <UU5.Bricks.Lsi lsi={assignmentLsi.deadline}/> </b> : {assignmentData.data.deadline}
              <br />
             <b> <UU5.Bricks.Lsi lsi={assignmentLsi.supervisor}/> </b> : {assignmentData.data.supervisorName}
            
            </UU5.Bricks.Block>

          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("assignmentDetail", { id: props.assignmentId })}
            >
              {assignmentData.data.name}
            </UU5.Bricks.Link>
          );
        }
      }
      return result;
    }

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={gradeLsi.userId} />,
          cell: (cellProps) => cellProps.data.data.userId,

        },
        {
          header: <UU5.Bricks.Lsi lsi={gradeLsi.name} />,
          cell: (cellProps) => cellProps.data.data.name,

        },
        {
          header: <UU5.Bricks.Lsi lsi={gradeLsi.grade} />,
          cell: (cellProps) => cellProps.data.data.grade,
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
                    onClick={() => { UU5.Environment.getRouter().setRoute("gradeDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedGrade(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setGradeToDelete(cellProps.data)}
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
    const Filter =[
      
    ]
    const Sorter =[
      
    ]
    return currentNestingLevel ? (

      <div {...attrs}>

        {
          getResult()
        }
        <UU5.Bricks.Line />

        {
          selectedGrade && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedGrade?.id ? gradeLsi.updateGrade : gradeLsi.createGrade} />}
              shown={!!selectedGrade}
              onClose={() => setSelectedGrade(null)}
            >
              <GradeForm
                selectedGrade={selectedGrade.data}
                selectedAssignment={assignmentData.data}
                setSelectedGrade={setSelectedGrade}
                handleCreateGrade={handleCreateGrade}
                handleUpdateGrade={handleUpdateGrade}
              />
            </UU5.Bricks.Modal>
          )
        }

        {gradeToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Grade Deletion"}
            shown={true}
            onClose={() => setGradeToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setGradeToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleGradeDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        
        <UU5.Bricks.Container>
          <Uu5Tiles.ControllerProvider data={gradeListData.data || []}  >
        <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedGrade({ data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={gradeLsi.create} />
        </UU5.Bricks.Button>
            <Uu5Tiles.List columns={getCollumns()} rowAlignment="center" rowHeight={150} />
          </Uu5Tiles.ControllerProvider>
        </UU5.Bricks.Container>
      </div>
    ) : null;

    //@@viewOff:render
  },
})
);

export default AssignmentDetail;
