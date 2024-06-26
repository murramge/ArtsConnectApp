import {supabase} from './supabase';
import type {
  Comment,
  CommentValue,
  createMeetingCommentParams,
} from './comment.d';

export const getMeetingComments = async (meetingId: number) => {
  try {
    const {data, error} = await supabase
      .from('meeting_comment')
      .select(
        `
        id,
        content,
        created_at,
        profile:public_profile(user_id, nickname, image_url)
        `,
      )
      .eq('meeting_id', meetingId);

    if (error) {
      throw new Error(error.message);
    }
    return data as Comment[]; // Type 오류나는데 정상작동, profile 배열이 아니라 객체로 들어옴
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createMeetingComment = async ({
  meetingId,
  content,
  replyOf,
}: createMeetingCommentParams) => {
  try {
    const value: CommentValue = {
      meeting_id: meetingId,
      content,
    };
    if (replyOf) {
      value.reply_of = replyOf;
    }

    const {error} = await supabase.from('meeting_comment').insert([value]);

    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateMeetingComment = async (
  commentId: number,
  params: {content: string},
) => {
  try {
    const {error} = await supabase
      .from('meeting_comment')
      .update([params])
      .eq('id', commentId);

    if (error) throw new Error(error.message);
  } catch (e) {
    throw e;
  }
};

export const deleteMeetingComment = async (commentId: number) => {
  try {
    const {error} = await supabase
      .from('meeting_comment')
      .delete()
      .eq('id', commentId);

    if (error) throw new Error(error.message);
  } catch (e) {
    throw e;
  }
};
