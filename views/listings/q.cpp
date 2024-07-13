#include <bits/stdc++.h>
using namespace std;

int solve(vector<int> &a, long long x, long long y) {
    long long sum = 0; 
    int start = 0;
    int maxi = 0;
    map<int, int> mp;  

    for (int i = 0; i < a.size(); i++) {
        if (a[i] == 0) {
            mp[i] = 0;
        } else if (a[i] <= x) {
            mp[i] = 1;
            x -= a[i];
        } else if (y > 0) {
            mp[i] = 2;
            y--;
        }

        while (start<=i&&y <= 0 && x < a[i]) {
            if (mp[start] == 1) x += a[start];
            if (mp[start] == 2) y++;
            start++;
        }

        maxi = max(i - start + 1, maxi);
    }
    return maxi;
}

int main() {
    ios_base::sync_with_stdio(false);  // Optimize I/O operations
    cin.tie(NULL);

    int t;
    cin >> t;   
    while (t--) {     
        int n;
        cin >> n;
        long long x, y;
        cin >> x >> y;
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        cout << solve(a, x, y) << endl;
    }

    return 0;
}
