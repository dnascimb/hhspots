package hottiehotspots.general;

import hottiehotspots.model.HotspotRating;

import java.util.Date;

public class QuickSort  {
	private HotspotRating[] ratings;
	private int ratingDate;

	public void sort(HotspotRating[] values) {
		// Check for empty or null array
		if (values ==null || values.length==0){
			return;
		}
		this.ratings = values;
		ratingDate = values.length;
		quicksort(0, ratingDate - 1);
	}

	private void quicksort(int low, int high) {
		int i = low, j = high;
		// Get the pivot element from the middle of the list
		Date pivot = ((HotspotRating)ratings[low + (high-low)/2]).getTimeDateStamp();

		// Divide into two lists
		while (i <= j) {
			// If the current value from the left list is smaller then the pivot
			// element then get the next element from the left list
			while (((HotspotRating)ratings[i]).getTimeDateStamp().before(pivot)) {
				i++;
			}
			// If the current value from the right list is larger then the pivot
			// element then get the next element from the right list
			while (((HotspotRating)ratings[j]).getTimeDateStamp().after(pivot)) {
				j--;
			}

			// If we have found a values in the left list which is larger then
			// the pivot element and if we have found a value in the right list
			// which is smaller then the pivot element then we exchange the
			// values.
			// As we are done we can increase i and j
			if (i <= j) {
				exchange(i, j);
				i++;
				j--;
			}
		}
		// Recursion
		if (low < j)
			quicksort(low, j);
		if (i < high)
			quicksort(i, high);
	}

	private void exchange(int i, int j) {
		HotspotRating temp = (HotspotRating)ratings[i];
		ratings[i] = ratings[j];
		ratings[j] = temp;
	}
}
