const getBadge = (rating) => {
    const badge = {
        title: "",
        badge: ""
    }

    if (rating >= 1000 && rating < 1200) {
        badge.title += "Iron 1"
        badge.badge += "Iron_1"
    } else if (rating >= 1200 && rating < 1400) {
        badge.title += "Iron 2"
        badge.badge += "Iron_2"
    } else if (rating >= 1400 && rating < 1600) {
        badge.title += "Iron 3"
        badge.badge += "Iron_3"
    } else if (rating >= 1600 && rating < 1800) {
        badge.title += "Bronze 1"
        badge.badge += "Bronze_1"
    } else if (rating >= 1800 && rating < 2000) {
        badge.title += "Bronze 2"
        badge.badge += "Bronze_2"
    } else if (rating >= 2000 && rating < 2200) {
        badge.title += "Bronze 3"
        badge.badge += "Bronze_3"
    } else if (rating >= 2200 && rating < 2400) {
        badge.title += "Silver 1"
        badge.badge += "Silver_1"
    } else if (rating >= 2400 && rating < 2600) {
        badge.title += "Silver 2"
        badge.badge += "Silver_2"
    } else if (rating >= 2600 && rating < 2800) {
        badge.title += "Silver 3"
        badge.badge += "Silver_3"
    } else if (rating >= 2800 && rating < 3000) {
        badge.title += "Platinum 1"
        badge.badge += "Platinum_1"
    } else if (rating >= 3000 && rating < 3200) {
        badge.title += "Platinum 2"
        badge.badge += "Platinum_2"
    } else if (rating >= 3200 && rating < 3400) {
        badge.title += "Platinum 3"
        badge.badge += "Platinum_3"
    } else if (rating >= 3400 && rating < 3600) {
        badge.title += "Gold 1"
        badge.badge += "Gold_1"
    } else if (rating >= 3600 && rating < 3800) {
        badge.title += "Gold 2"
        badge.badge += "Gold_2"
    } else if (rating >= 3800 && rating < 4500) {
        badge.title += "Gold 3"
        badge.badge += "Gold_3"
    } else if (rating >= 4500) {
        badge.title += "Legendary"
        badge.badge += "Gold_5"
    }

    return badge;

}

module.exports = getBadge;