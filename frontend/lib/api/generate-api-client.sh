#!/bin/bash -e

curl -o rawpotion-mealplanner.json http://localhost:8080/swagger/v1/swagger.json
npx @rtk-incubator/rtk-query-codegen-openapi --baseQuery ./customBaseQueryWithAuthentication.ts:baseQueryWithAuth --hooks rawpotion-mealplanner.json > rawpotion-mealplanner-api.generated.ts
