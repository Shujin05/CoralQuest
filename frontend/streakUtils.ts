import { supabase } from './lib/supabase'; // Ensure supabase client is correctly imported

// Function to update streak count and last sign-in date
export const updateStreak = async (session: any): Promise<void> => {
  if (session) {
    const currentDate = new Date();

    // Fetch the user's streak data from Supabase
    const { data: userData, error } = await supabase
      .from('users')
      .select('streak_count, last_sign_in')
      .eq('id', session.user.id)
      .single();

    if (error || !userData) {
      console.error('Error fetching user data from Supabase:', error);
      return;
    }

    const { streak_count, last_sign_in } = userData;

    // Convert last_sign_in from timestamp or date string to Date object
    const lastSignInDate = new Date(last_sign_in);

    // Compare last sign-in date with current date (ignoring time part for comparison)
    if (lastSignInDate.toDateString() !== currentDate.toDateString()) {
      const dayDifference = (currentDate.getTime() - lastSignInDate.getTime()) / (1000 * 3600 * 24);

      let newStreakCount = streak_count;

      if (dayDifference === 1) {
        // Increment streak if the difference is exactly one day
        newStreakCount += 1;
      } else {
        // Reset streak if more than a day has passed
        newStreakCount = 1;
      }

      // Update the streak count and last sign-in date in Supabase
      const { error: updateError } = await supabase
        .from('users')
        .update({
          streak_count: newStreakCount,
          last_sign_in: currentDate.toISOString(), // Store as ISO string
        })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error updating streak in Supabase:', updateError);
      } else {
        console.log(`Streak updated to ${newStreakCount}`);
      }
    }
  }
};
