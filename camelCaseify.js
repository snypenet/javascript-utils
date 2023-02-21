    const camelCaseify = (source) => {
        if (!source || (!Array.isArray(source) && typeof source !== 'object')) {
            return source;
        }

        if (Array.isArray(source)) {
            const newArray = [];
            for (const i of source) {
                newArray.push(camelCaseify(i));
            }

            return newArray;
        }

        const replacement = {};
        for (const k in source) {
            let newKey = k[0].toLowerCase() + k.substring(1);
            if (newKey.length <= 4) {
                newKey = newKey.toLowerCase(); // if it's short 4 or less then it's probably an abbreviation or acronym
            }
            replacement[newKey] = camelCaseify(source[k]);
        }
        return replacement;
    };
