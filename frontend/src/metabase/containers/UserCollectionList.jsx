/* eslint-disable react/prop-types */
import React from "react";
import { Box, Flex } from "grid-styled";
import { connect } from "react-redux";

import * as Urls from "metabase/lib/urls";
import { color } from "metabase/lib/colors";

import Card from "metabase/components/Card";
import Icon from "metabase/components/Icon";
import { Grid, GridItem } from "metabase/components/Grid";
import Link from "metabase/components/Link";
import BrowserCrumbs from "metabase/components/BrowserCrumbs";

import User from "metabase/entities/users";
import Collection, {
  ROOT_COLLECTION,
  PERSONAL_COLLECTIONS,
} from "metabase/entities/collections";

function mapStateToProps(state) {
  return {
    collectionsById: state.entities.collections,
  };
}

const UserCollectionList = ({ collectionsById }) => (
  <Box px={4}>
    <Box py={2}>
      <BrowserCrumbs
        crumbs={[
          { title: ROOT_COLLECTION.name, to: Urls.collection({ id: "root" }) },
          { title: PERSONAL_COLLECTIONS.name },
        ]}
      />
    </Box>
    <User.ListLoader>
      {({ list }) => {
        return (
          <Box>
            <Grid>
              {// map through all users that have logged in at least once
              // which gives them a personal collection ID
              list.map(
                user =>
                  user.personal_collection_id && (
                    <GridItem width={1 / 3} key={user.personal_collection_id}>
                      <Link
                        to={Urls.collection(
                          collectionsById[user.personal_collection_id],
                        )}
                      >
                        <Card p={2} hoverable>
                          <Flex align="center">
                            <Icon
                              name="person"
                              mr={1}
                              color={color("text-medium")}
                              size={18}
                            />
                            <h3>{user.common_name}</h3>
                          </Flex>
                        </Card>
                      </Link>
                    </GridItem>
                  ),
              )}
            </Grid>
          </Box>
        );
      }}
    </User.ListLoader>
  </Box>
);

export default Collection.loadList()(
  connect(mapStateToProps)(UserCollectionList),
);
