# Notifications

Notifications allow you to know when new activities (Pull Requests or discussions) happen on models, datasets, and Spaces belonging to users or organizations you are watching.

By default, you'll receive a notification if:

- Someone mentions you in a discussion/PR.
- A new comment is posted in a discussion/PR you participated in.
- A new discussion/PR or comment is posted in one of the repositories of an organization or user you are watching.

![Notifications page](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/notifications-page.png)

You'll get new notifications by email and [directly on the website](https://huggingface.co/notifications), you can change this in your [notifications settings](#notifications-settings).

## Filtering and managing notifications

On the [notifications page](https://huggingface.co/notifications), you have several options for filtering and managing your notifications more effectively:
 - Filter by Repository: Choose to display notifications from a specific repository only.
 - Filter by Read Status: Display only unread notifications or all notifications.
 - Filter by Participation: Show notifications you have participated in or those which you have been directly mentioned.

Additionally, you can take the following actions to manage your notifications:

 - Mark as Read/Unread: Change the status of notifications to mark them as read or unread.
 - Mark as Done: Once marked as done, notifications will no longer appear in the notification center (they are deleted).
 
By default, changes made to notifications will only apply to the selected notifications on the screen. However, you can also apply changes to all matching notifications (like in Gmail for instance) for greater convenience.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/notifications-select-all.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/notifications-select-all-dark.png"/>
</div>

## Watching users and organizations

By default, you'll be watching all the organizations you are a member of and will be notified of any new activity on those.

You can also choose to get notified on arbitrary users or organizations. To do so, use the "Watch" button on their HF profiles. Note that you can also quickly watch/unwatch users and organizations directly from your [notifications settings](#notifications-settings).

_Unlike Github or similar services, you cannot watch a specific repository. You must watch users/organizations to get notified about any new activity on any of their repositories. The goal is to simplify this functionality for users as much as possible and to make sure you don't miss anything you might be interested in._

## Notifications settings

In your [notifications settings](https://huggingface.co/settings/notifications) page, you can choose specific channels to get notified on depending on the type of activity, for example, receiving an email for direct mentions but only a web notification for new activity on watched users and organizations. By default, you'll get an email and a web notification for any new activity but feel free to adjust your settings depending on your needs.

_Note that clicking the unsubscribe link in an email will unsubscribe you for the type of activity, eg direct mentions._

![Notifications settings page](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/notifications-settings.png)

You can quickly add any user/organization to your watch list by searching them by name using the dedicated search bar.
Unsubscribe from a specific user/organization simply by unticking the corresponding checkbox.

## Mute notifications for a specific repository

It's possible to mute notifications for a particular repository by using the "Mute notifications" action in the repository's contextual menu.
This will prevent you from receiving any new notifications for that particular repository. You can unmute the repository at any time by clicking the "Unmute notifications" action in the same repository menu.

![mute notification menu](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/notifications-mute-menu.png)

_Note, if a repository is muted, you won't receive any new notification unless you're directly mentioned or participating to a discussion._ 

The list of muted repositories is available from the notifications settings page:

![Notifications settings page muted repositories](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/notifications-settings-muted.png)
