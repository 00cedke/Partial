const mongoose = require('mongoose');
const { mongoose: mongooseConfig } = require('../config.json');

const { uri, database, options } = mongooseConfig;
const logger = require('./logger');

let connection;
mongoose.set('strictQuery', true);

async function connect() {
    await mongoose.connect(`${uri}/${database}`, options);
    connection = mongoose.connection;
    connection.on('connected', function () {
        logger.info(`MongoDB connected ${this.name}`);
    });
    connection.on('error', console.error.bind(console, 'data connection error:'));
    connection.on('close', () => {
        connection.removeAllListeners();
    });
}

function verifyConnected() {
    if (!connection) {
        connect();
    }
}

async function getCommunities(numberOfCommunities) {
    verifyConnected();
    if(numberOfCommunities === -1)
        return COMMUNITY.find({ parent: null, type: [0,2] });
    else
        return COMMUNITY.find({ parent: null, type: [0,2] }).limit(numberOfCommunities);
}

async function getMostPopularCommunities(numberOfCommunities) {
    verifyConnected();
    return COMMUNITY.find({ parent: null, type: 0 }).sort({followers: -1}).limit(numberOfCommunities);
}

async function getNewCommunities(numberOfCommunities) {
    verifyConnected();
    return COMMUNITY.find({ parent: null, type: 0 }).sort([['created_at', -1]]).limit(numberOfCommunities);
}

async function getSubCommunities(communityID) {
    verifyConnected();
    return COMMUNITY.find({
        parent: communityID
    });
}

async function getCommunityByTitleID(title_id) {
    verifyConnected();
    return COMMUNITY.findOne({
        title_id: title_id
    });
}

async function getCommunityByID(community_id) {
    verifyConnected();
    return COMMUNITY.findOne({
        olive_community_id: community_id
    });
}

async function getTotalPostsByCommunity(community) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        parent: null,
        removed: false
    }).countDocuments();
}

async function getPostByID(postID) {
    verifyConnected();
    return POST.findOne({
        id: postID
    });
}

async function getPostsByUserID(userID) {
    verifyConnected();
    return POST.find({
        nnid: userID,
        parent: null,
        removed: false
    });
}

async function getPostReplies(postID, number) {
    verifyConnected();
    return POST.find({
        parent: postID,
        removed: false
    }).limit(number);
}

async function getDuplicatePosts(nnid, post) {
    verifyConnected();
    return POST.findOne({
        nnid: nnid,
        body: post.body,
        painting: post.painting,
        screenshot: post.screenshot,
        parent: null,
        removed: false
    });
}

async function getUserPostRepliesAfterTimestamp(post, numberOfPosts) {
    verifyConnected();
    return POST.find({
        parent: post.nnid,
        created_at: { $lt: post.created_at },
        message_to_pid: null,
        removed: false
    }).limit(numberOfPosts);
}

async function getNumberUserPostsByID(userID, number) {
    verifyConnected();
    return POST.find({
        nnid: userID,
        parent: null,
        message_to_pid: null,
        removed: false
    }).sort({ created_at: -1}).limit(number);
}

async function getTotalPostsByUserID(userID) {
    verifyConnected();
    return POST.find({
        nnid: userID,
        parent: null,
        message_to_pid: null,
        removed: false
    }).countDocuments();
}

async function getHotPostsByCommunity(community, numberOfPosts) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        parent: null,
        removed: false
    }).sort({empathy_count: -1}).limit(numberOfPosts);
}

async function getNumberNewCommunityPostsByID(community, number) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        parent: null,
        removed: false
    }).sort({ created_at: -1}).limit(number);
}

async function getNumberPopularCommunityPostsByID(community, limit, offset) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        parent: null,
        removed: false
    }).sort({ empathy_count: -1}).skip(offset).limit(limit);
}

async function getNumberVerifiedCommunityPostsByID(community, limit, offset) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        verified: true,
        parent: null,
        removed: false
    }).sort({ created_at: -1}).skip(offset).limit(limit);
}

async function getPostsByCommunity(community, numberOfPosts) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        parent: null,
        removed: false
    }).limit(numberOfPosts);
}

async function getPostsByCommunityKey(community, numberOfPosts, search_key) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        search_key: search_key,
        parent: null,
        removed: false
    }).limit(numberOfPosts);
}

async function getNewPostsByCommunity(community, limit, offset) {
    verifyConnected();
    return POST.find({
        community_id: community.olive_community_id,
        parent: null,
        removed: false
    }).sort({ created_at: -1 }).skip(offset).limit(limit);
}

async function getAllUserPosts(nnid) {
    verifyConnected();
    return POST.find({
        nnid: nnid,
        message_to_pid: null
    });
}

async function getRemovedUserPosts(nnid) {
    verifyConnected();
    return POST.find({
        nnid: nnid,
        message_to_pid: null,
        removed: true
    });
}

async function getUserPostsAfterTimestamp(post, numberOfPosts) {
    verifyConnected();
    return POST.find({
        nnid: post.nnid,
        created_at: { $lt: post.created_at },
        parent: null,
        message_to_pid: null,
        removed: false
    }).limit(numberOfPosts);
}

async function getUserPostsOffset(nnid, limit, offset) {
    verifyConnected();
    return POST.find({
        nnid: nnid,
        parent: null,
        message_to_pid: null,
        removed: false
    }).skip(offset).limit(limit).sort({ created_at: -1});
}

async function getCommunityPostsAfterTimestamp(post, numberOfPosts) {
    verifyConnected();
    return POST.find({
        community_id: post.community_id,
        created_at: { $lt: post.created_at },
        parent: null,
        removed: false
    }).limit(numberOfPosts);
}

async function getEndpoints() {
    verifyConnected();
    return ENDPOINT.find({});
}

async function getEndPoint(accessLevel) {
    verifyConnected();
    return ENDPOINT.findOne({
        server_access_level: accessLevel
    })
}

async function getUsersSettings(numberOfUsers) {
    verifyConnected();
    if(numberOfUsers === -1)
        return SETTINGS.find({});
    else
        return SETTINGS.find({}).limit(numberOfUsers);
}

async function getUsersContent(numberOfUsers) {
    verifyConnected();
    if(numberOfUsers === -1)
        return SETTINGS.find({});
    else
        return SETTINGS.find({}).limit(numberOfUsers);
}

async function getUserSettings(nnid) {
    verifyConnected();
        return SETTINGS.findOne({nnid: nnid});
}

async function getUserContent(nnid) {
    verifyConnected();
    return CONTENT.findOne({nnid: nnid});
}

async function getFollowingUsers(content) {
    verifyConnected();
    return SETTINGS.find({
        nnid: content.following_users
    });
}

async function getFollowedUsers(content) {
    verifyConnected();
    return SETTINGS.find({
        nnid: content.followed_users
    });
}

async function getNewsFeed(content, numberOfPosts) {
    verifyConnected();
    return POST.find({
        $or: [
            {pid: content.followed_users},
            {pid: content.nnid},
            {community_id: content.followed_communities},
        ],
        parent: null,
        message_to_pid: null,
        removed: false
    }).limit(numberOfPosts).sort({ created_at: -1});
}

async function getNewsFeedAfterTimestamp(content, numberOfPosts, post) {
    verifyConnected();
    return POST.find({
        $or: [
            {nnid: content.followed_users},
            {nnid: content.nnid},
            {community_id: content.followed_communities},
        ],
        created_at: { $lt: post.created_at },
        parent: null,
        message_to_pid: null,
        removed: false
    }).limit(numberOfPosts).sort({ created_at: -1});
}

async function getNewsFeedOffset(content, limit, offset) {
    verifyConnected();
    return POST.find({
        $or: [
            {pid: content.followed_users},
            {pid: content.nnid},
            {community_id: content.followed_communities},
        ],
        parent: null,
        message_to_pid: null,
        removed: false
    }).skip(offset).limit(limit).sort({ created_at: -1});
}

async function getConversations(nnid) {
    verifyConnected();
    return CONVERSATION.find({
        "users.nnid": nnid
    }).sort({ last_updated: -1});
}

async function getUnreadConversationCount(nnid) {
    verifyConnected();
    return CONVERSATION.find({
        "users": { $elemMatch: {
                'nnid': nnid,
                'read': false
            }}

    }).countDocuments();
}

async function getConversationByID(community_id) {
    verifyConnected();
    return CONVERSATION.findOne({
        type: 3,
        id: community_id
    });
}

async function getConversationMessages(community_id, limit, offset) {
    verifyConnected();
    return POST.find({
        community_id: community_id,
        parent: null,
        removed: false
    }).sort({created_at: 1}).skip(offset).limit(limit);
}

async function getConversationByUsers(nnids) {
    verifyConnected();
    return CONVERSATION.findOne({
        $and: [
            {'users.nnid': nnids[0]},
            {'users.nnid': nnids[1]}
        ]
    });
}

async function getLatestMessage(nnid, nnid2) {
    verifyConnected();
    return POST.findOne({
        $or: [
            {nnid: nnid, message_to_pid: nnid2},
            {nnid: nnid2, message_to_pid: nnid}
        ],
        removed: false
    })
}

async function getNotifications(nnid, limit, offset) {
    verifyConnected();
    return NOTIFICATION.find({
       nnid: nnid,
    }).sort({lastUpdated: -1}).skip(offset).limit(limit);
}

async function getNotification(nnid, type, reference_id) {
    verifyConnected();
    return NOTIFICATION.findOne({
        nnid: nnid,
        type: type,
        reference_id: reference_id
    })
}

async function getLastNotification(nnid) {
    verifyConnected();
    return NOTIFICATION.findOne({
        pid: nnid
    }).sort({lastUpdated: -1}).limit(1);
}

async function getUnreadNotificationCount(nnid) {
    verifyConnected();
    return NOTIFICATION.find({
        nnid: nnid,
        read: false
    }).countDocuments();
}

async function getAllReports(offset, limit) {
    verifyConnected();
    return REPORT.find().sort({created_at: -1}).skip(offset).limit(limit);
}

async function getAllOpenReports(offset, limit) {
    verifyConnected();
    return REPORT.find({ resolved: false }).sort({created_at: -1}).skip(offset).limit(limit);
}

async function getReportsByUser(nnid, offset, limit) {
    verifyConnected();
    return REPORT.find({ reported_by: nnid }).sort({created_at: -1}).skip(offset).limit(limit);
}

async function getReportsByPost(postID, offset, limit) {
    verifyConnected();
    return REPORT.find({ post_id: postID }).sort({created_at: -1}).skip(offset).limit(limit);
}

async function getReportById(id) {
    verifyConnected();
    return REPORT.findById(id);
}


module.exports = {
    connect,
    getCommunities,
    getMostPopularCommunities,
    getNewCommunities,
    getSubCommunities,
    getCommunityByTitleID,
    getCommunityByID,
    getTotalPostsByCommunity,
    getPostsByCommunity,
    getHotPostsByCommunity,
    getNumberNewCommunityPostsByID,
    getNumberPopularCommunityPostsByID,
    getNumberVerifiedCommunityPostsByID,
    getNewPostsByCommunity,
    getPostsByCommunityKey,
    getPostsByUserID,
    getPostReplies,
    getUserPostRepliesAfterTimestamp,
    getNumberUserPostsByID,
    getTotalPostsByUserID,
    getPostByID,
    getDuplicatePosts,
    getEndpoints,
    getEndPoint,
    getUserPostsAfterTimestamp,
    getUserPostsOffset,
    getCommunityPostsAfterTimestamp,
    getNewsFeed,
    getNewsFeedAfterTimestamp,
    getNewsFeedOffset,
    getFollowingUsers,
    getFollowedUsers,
    getConversations,
    getConversationByID,
    getConversationByUsers,
    getConversationMessages,
    getUnreadConversationCount,
    getLatestMessage,
    getUsersSettings,
    getUsersContent,
    getUserSettings,
    getUserContent,
    getNotifications,
    getUnreadNotificationCount,
    getNotification,
    getLastNotification,
    getAllUserPosts,
    getRemovedUserPosts,
    getAllReports,
    getAllOpenReports,
    getReportsByUser,
    getReportsByPost,
    getReportById
};
