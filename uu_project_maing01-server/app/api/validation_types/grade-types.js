/* eslint-disable */

const gradeCreateDtoInType = shape({
  grade:integer(5).isRequired(),
  assignmentId:id().isRequired(),
  userId:array(uu5String(255)).isRequired(),
});

const gradeUpdateDtoInType = shape({
  id: id().isRequired(),
  grade:integer(5),
  assignmentId:id(),
  userId:array(uu5String(255)),
});
const gradeDeleteDtoInType = shape({
  id: id().isRequired(),
    });

const gradeListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
const gradeGetDtoInType = shape({
  id: id().isRequired()
});

const gradeFilterDtoInType = shape({

});