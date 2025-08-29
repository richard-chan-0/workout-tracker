# Testing Your PWA: Step-by-Step Guide

## 🎯 The Issue You Experienced

You were getting `ERR_INTERNET_DISCONNECTED` when refreshing offline because:

1. **Development Mode**: PWA service workers don't work properly in Vite's dev server
2. **Missing Navigation Fallback**: Service worker wasn't intercepting page requests
3. **HTML Not Cached**: The `index.html` file wasn't being cached properly

## ✅ How to Test PWA Functionality

### Method 1: Production Build (Recommended)

1. **Build the app**:

   ```bash
   pnpm build
   ```

2. **Serve the production build**:

   ```bash
   pnpm preview
   ```

3. **Open in browser**:

   - Go to `http://localhost:4173` (or whatever port it shows)
   - Wait for the page to load completely

4. **Test offline functionality**:
   - Open Chrome DevTools (F12)
   - Go to **Network** tab
   - Check the **"Offline"** checkbox
   - **Refresh the page** - it should still work! 🎉

### Method 2: Development Mode (Limited)

1. **Start dev server**:

   ```bash
   pnpm dev
   ```

2. **Open in browser**:

   - Go to `http://localhost:5173`
   - Check the "Service Worker Status" section

3. **Note**: PWA features are limited in dev mode

## 🔍 What to Look For

### Service Worker Status

The app now shows a "Service Worker Status" section with:

- ✅ **Service Worker Registered**: Should be "Yes"
- ✅ **Controlling Page**: Should be "Yes" (after first load)
- ✅ **Ready**: Should be "Yes"

### Offline Testing Steps

1. **Load the page** while online
2. **Go offline** in DevTools
3. **Refresh the page** - should still work
4. **Check status indicators** - should show "Offline"

## 🚨 Common Issues & Solutions

### Issue: Still getting ERR_INTERNET_DISCONNECTED

**Solution**:

- Make sure you're testing the **production build** (`pnpm preview`)
- Not the development server (`pnpm dev`)

### Issue: Service Worker not registered

**Solution**:

- Check browser console for errors
- Make sure you're using HTTPS or localhost
- Clear browser cache and reload

### Issue: App doesn't work offline

**Solution**:

- Wait for the page to fully load before going offline
- Check that the service worker is "Controlling Page"
- Try refreshing the page once while online first

## 🧪 Advanced Testing

### 1. **Installation Testing**

- Open in Chrome/Edge
- Look for install prompt in address bar
- Click install icon
- Test offline functionality of installed app

### 2. **Cache Inspection**

1. Open DevTools → **Application** tab
2. Go to **Storage** → **Cache Storage**
3. You should see cache entries for your app

### 3. **Service Worker Inspection**

1. Open DevTools → **Application** tab
2. Go to **Service Workers**
3. Check if your SW is registered and active

## 📱 Mobile Testing

### 1. **Chrome Mobile**

- Open Chrome on your phone
- Navigate to your app URL
- Add to home screen
- Test offline functionality

### 2. **Safari (iOS)**

- Open Safari on iPhone/iPad
- Navigate to your app URL
- Add to home screen via share button
- Test offline functionality

## 🔧 Debugging Tips

### 1. **Check Console Logs**

Look for:

- Service worker registration messages
- Cache storage messages
- Any error messages

### 2. **Network Tab**

- Check if requests are being intercepted
- Look for service worker involvement
- Verify caching behavior

### 3. **Application Tab**

- Verify service worker registration
- Check cache storage contents
- Inspect manifest file

## 🎯 Expected Behavior

### When Online:

- App loads normally
- Service worker registers
- Resources are cached
- Status shows "Online"

### When Offline:

- App still works
- Cached resources served
- Status shows "Offline"
- No network requests made

### After Refresh (Offline):

- App loads from cache
- No "No Internet" page
- All functionality preserved
- Service worker handles navigation

## 🚀 Next Steps

Once PWA is working:

1. **Add workout tracking features**
2. **Implement IndexedDB for data storage**
3. **Add background sync functionality**
4. **Deploy to production (AWS S3 + CloudFront)**

Your PWA should now work offline! 🎉
